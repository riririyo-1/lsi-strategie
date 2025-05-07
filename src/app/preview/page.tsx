"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    BarChart,
    Settings,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    Sun,
    Moon,
    Loader2,
    Rss,
    List,
    FileText,
    TrendingUp,
    ArrowLeftCircle,
    ArrowRightCircle,
    Cpu,
    AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import en from '@/locales/en.json';     // 翻訳ファイルのインポート
import ja from '@/locales/ja.json';     // 翻訳ファイルのインポート


// -- 国際化の設定 ---------------------------------------

type Language = 'en' | 'ja';

const getTranslations = (lang: Language) => {
    return lang === 'en' ? en : ja;
};


// -- インターフェースや定数 ---------------------------------------

interface NavItem {
    label: string;
    icon: React.ReactNode;
    route: string;
    submenus?: NavItem[];
}

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
}


const NAV_ITEMS: NavItem[] = [
    { label: 'dashboard', icon: <LayoutDashboard className="w-4 h-4" />, route: '/' },
    {
        label: 'lectures', icon: <Users className="w-4 h-4" />, route: '/lectures',
        submenus: [
            { label: 'research', icon: null, route: '/lectures/research' },
        ]
    },
    {
        label: 'topics', icon: <Rss className="w-4 h-4" />, route: '/topics',
        submenus: [
            { label: 'collection', icon: null, route: '/topics/collection' },
            { label: 'list', icon: <List className="w-4 h-4" />, route: '/topics/list' },
            { label: 'delivery', icon: <FileText className="w-4 h-4" />, route: '/topics/delivery' },
        ]
    },
    { label: 'analytics', icon: <TrendingUp className="w-4 h-4" />, route: '/analytics' },
    { label: 'settings', icon: <Settings className="w-4 h-4" />, route: '/settings' },
];

const sidebarVariants = {
    open: {
        width: 240,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
    closed: {
        width: 64,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
};

const contentVariants = {
    open: {
        marginLeft: 240,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
    closed: {
        marginLeft: 64,
        transition: {
            duration: 0.3,
            ease: 'easeInOut',
        },
    },
};

const menuItemVariants = {
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2,
            delay: 0.1,
        },
    },
    closed: {
        opacity: 0,
        x: -20,
        transition: {
            duration: 0.1,
        },
    },
};

const submenuVariants = {
    open: {
        opacity: 1,
        height: 'auto',
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.2,
        },
    },
};

const NavItemComponent: React.FC<{ item: NavItem; isSidebarOpen: boolean; onNavigate: (route: string) => void; 
        getTranslation: (key: keyof typeof en) => string;
    }> = ({ item, isSidebarOpen, onNavigate, getTranslation }) => {
    
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const handleItemClick = () => {
        if (item.submenus) {
            setIsSubmenuOpen(!isSubmenuOpen);
        } else {
            onNavigate(item.route);
        }
    };

    return (
        <div className="space-y-1">
            <motion.div
                className={cn(
                    'flex items-center gap-4 p-2 rounded-md cursor-pointer transition-colors',
                    'hover:bg-gray-200 dark:hover:bg-gray-800/50', // ライトモード用のホバー背景色を追加
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                )}
                onClick={handleItemClick}
                variants={menuItemVariants}
                initial={isSidebarOpen ? 'open' : 'closed'}
                animate={isSidebarOpen ? 'open' : 'closed'}
            >
                {item.icon}
                <span className={cn('transition-opacity text-sm text-gray-700 dark:text-gray-300', isSidebarOpen ? 'opacity-100' : 'opacity-0')}> {/* ライトモード用の文字色を追加 */}
                    {getTranslation(item.label as keyof typeof translations['en'])}
                </span>
                {item.submenus && isSidebarOpen && (
                    <span className="ml-auto text-gray-700 dark:text-gray-300"> {/* ライトモード用の文字色を追加 */}
                        {isSubmenuOpen ? (
                            <ChevronUp className="w-4 h-4" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                    </span>
                )}
            </motion.div>
            <AnimatePresence>
                {item.submenus && isSubmenuOpen && isSidebarOpen && (
                    <motion.div
                        variants={submenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="space-y-1 ml-8"
                    >
                        {item.submenus.map((subItem, index) => (
                            <div
                                key={index}
                                className="p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800/50 text-sm text-gray-700 dark:text-gray-300" // ライトモード用のスタイルを追加
                                onClick={() => onNavigate(subItem.route)}
                            >
                                {getTranslation(subItem.label as keyof typeof translations['en'])}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TaskCard: React.FC<{
    task: Task;
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
    onDeleteTask: (id: string) => void;
    getTranslation: (key: keyof typeof en) => string;
}> = ({ task, onUpdateTask, onDeleteTask, getTranslation }) => {
    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'; // ライトモード用の色を追加
            case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'; // ライトモード用の色を追加
            case 'low': return 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'; // ライトモード用の色を追加
            default: return '';
        }
    };

    return (
        <motion.div
            className="bg-white dark:bg-gray-800/50 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700/50" // ライトモード用の背景色とボーダー色を追加
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
        >
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3> {/* ライトモード用の文字色を追加 */}
                <span className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getPriorityColor(task.priority),
                )}>
                    {getTranslation(task.priority)}
                </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{task.description}</p> {/* ライトモード用の文字色を追加 */}
            <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => onUpdateTask(task.id, { completed: e.target.checked })}
                        className="h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500" // ライトモード用のボーダー色を追加
                    />
                    <span className="text-gray-700 dark:text-gray-300">{getTranslation('completed')}</span> {/* ライトモード用の文字色を追加 */}
                </label>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-500/20 border-red-300 dark:border-red-500/30" // ライトモード用のスタイルを追加
                    onClick={() => onDeleteTask(task.id)}
                >
                    {getTranslation('delete')}
                </Button>
            </div>
        </motion.div>
    );
};

const AdminPanel = () => {
    const [language, setLanguage] = useState<Language>('ja');   // 初期値を日本語に設定
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeRoute, setActiveRoute] = useState('/');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setTheme, theme } = useTheme();

    const getTranslation = useCallback((key: keyof typeof en) => {
            const translations = getTranslations(language);
            return translations[key] || getTranslations('ja')[key] || key;
        },[language]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language') as Language;
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const handleLanguageChange = (selectedLanguage: string) => {
        setLanguage(selectedLanguage as Language);
    };

    const handleNavigate = useCallback((route: string) => {
        setActiveRoute(route);
    }, []);

    const addTask = () => {
        if (!newTaskTitle.trim()) {
            setError('タスク名を入力してください。');
            return;
        }
        setLoading(true);
        setError(null);
        setTimeout(() => {
            const newTask: Task = {
                id: crypto.randomUUID(),
                title: newTaskTitle,
                description: newTaskDescription,
                completed: false,
                priority: newTaskPriority,
            };
            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setNewTaskDescription('');
            setNewTaskPriority('medium');
            setLoading(false);
        }, 500);
    };

    const updateTask = (id: string, updates: Partial<Task>) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, ...updates } : task
        ));
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeRoute) {
            case '/':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{getTranslation('dashboard')}</h2> {/* ライトモード用の文字色 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700/50"> {/* ライトモード用のスタイル */}
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{getTranslation('totalViews')}</h3> {/* ライトモード用の文字色 */}
                                <p className="text-2xl text-blue-500 dark:text-blue-400 mt-2">12,345</p> {/* ライトモード用の文字色 */}
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700/50"> {/* ライトモード用のスタイル */}
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{getTranslation('totalLectures')}</h3> {/* ライトモード用の文字色 */}
                                <p className="text-2xl text-green-500 dark:text-green-400 mt-2">56</p> {/* ライトモード用の文字色 */}
                            </div>
                            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700/50"> {/* ライトモード用のスタイル */}
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{getTranslation('tasks')}</h3> {/* ライトモード用の文字色 */}
                                <p className="text-2xl text-yellow-500 dark:text-yellow-400 mt-2">{tasks.length}</p> {/* ライトモード用の文字色 */}
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700/50"> {/* ライトモード用のスタイル */}
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">{getTranslation('tasksList')}</h2> {/* ライトモード用の文字色 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="task-title" className="text-gray-700 dark:text-gray-300">{getTranslation('taskTitle')}</Label> {/* ライトモード用の文字色 */}
                                        <Input
                                            id="task-title"
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                            placeholder="タスク名を入力"
                                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" // ライトモード用のスタイル
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="task-description" className="text-gray-700 dark:text-gray-300">{getTranslation('taskDescription')}</Label> {/* ライトモード用の文字色 */}
                                        <Input
                                            id="task-description"
                                            value={newTaskDescription}
                                            onChange={(e) => setNewTaskDescription(e.target.value)}
                                            placeholder="タスクの説明を入力"
                                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" // ライトモード用のスタイル
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="task-priority" className="text-gray-700 dark:text-gray-300">{getTranslation('taskPriority')}</Label> {/* ライトモード用の文字色 */}
                                        <select
                                            id="task-priority"
                                            value={newTaskPriority}
                                            onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
                                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-md px-3 py-2 w-full" // ライトモード用のスタイル
                                        >
                                            <option value="high">{getTranslation('high')}</option>
                                            <option value="medium">{getTranslation('medium')}</option>
                                            <option value="low">{getTranslation('low')}</option>
                                        </select>
                                    </div>
                                    <Button
                                        onClick={addTask}
                                        disabled={loading}
                                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full" // ライトモード用のスタイル調整
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                {getTranslation('addTask')}...
                                            </>
                                        ) : (
                                            getTranslation('addTask')
                                        )}
                                    </Button>
                                    {error && (
                                        <div className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 p-3 rounded-md flex items-center gap-2"> {/* ライトモード用のスタイル */}
                                            <AlertTriangle className="w-5 h-5" />
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-gray-700 dark:text-gray-300">{getTranslation('tasksList')}</Label> {/* ライトモード用の文字色 */}
                                    <div className="mt-2 space-y-3 max-h-[300px] overflow-y-auto">
                                        <AnimatePresence>
                                            {tasks.map(task => (
                                                <TaskCard
                                                    key={task.id}
                                                    task={task}
                                                    onUpdateTask={updateTask}
                                                    onDeleteTask={deleteTask}
                                                    getTranslation={getTranslation}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case '/lectures':
                return <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Lectures Page</h2>; {/* ライトモード用の文字色 */}
            case '/topics':
                return <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Topics Page</h2>; {/* ライトモード用の文字色 */}
            case '/analytics':
                return <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Analytics Page</h2>; {/* ライトモード用の文字色 */}
            case '/settings':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{getTranslation('settings')}</h2> {/* ライトモード用の文字色 */}
                    </div>
                );
            default:
                return <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{getTranslation('notFound')}</h2>; {/* ライトモード用の文字色 */}
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900"> {/* ライトモード用の背景色 */}
            {/* サイドバー */}
            <motion.aside
                className="bg-white dark:bg-gray-950 h-full text-gray-900 dark:text-white border-r border-gray-200 dark:border-gray-800 overflow-y-auto" // ライトモード用のスタイル
                initial={{ width: 64 }}
                animate={{ width: isSidebarOpen ? 240 : 64 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800"> {/* ライトモード用のボーダー色 */}
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-2"
                            >
                                <Cpu className="w-6 h-6" />
                                <span className="text-xl font-semibold text-gray-900 dark:text-white">{getTranslation('title')}</span> {/* ライトモード用の文字色 */}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" // ライトモード用の文字色
                        aria-label={isSidebarOpen ? getTranslation('closeMenu') : getTranslation('openMenu')}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
                <nav className="p-4 space-y-2">
                    {NAV_ITEMS.map(item => (
                        <NavItemComponent
                            key={item.label}
                            item={item}
                            isSidebarOpen={isSidebarOpen}
                            onNavigate={handleNavigate}
                            getTranslation={getTranslation}
                        />
                    ))}
                </nav>
            </motion.aside>

            {/* メインコンテンツ */}
            <main className="flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-transparent"> {/* ライトモード用の背景色 */}
                <div className="flex justify-end items-center gap-4 mb-8">
                    <Select onValueChange={handleLanguageChange} value={language}>
                        <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"> {/* ライトモード用のスタイル */}
                            <SelectValue placeholder={getTranslation('changeLanguage')} />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"> {/* ライトモード用のスタイル */}
                            <SelectItem value="ja" className="hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-900 dark:text-white">日本語</SelectItem> {/* ライトモード用のスタイル */}
                            <SelectItem value="en" className="hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-900 dark:text-white">English</SelectItem> {/* ライトモード用のスタイル */}
                        </SelectContent>
                    </Select>
                    <button
                        type="button"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        aria-label={theme === 'dark' ? getTranslation('lightMode') : getTranslation('nightMode')}
                        className="ml-2 p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-yellow-500 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title={theme === 'dark' ? getTranslation('lightMode') : getTranslation('nightMode')}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>
                </div>
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminPanel;

