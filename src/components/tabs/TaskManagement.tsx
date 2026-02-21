import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";
import { taskService, type Task, type TaskStatus, type TaskPriority } from "@/services/task.service";
import TaskDetailModal from "@/components/modals/TaskDetailModal";
import { toast } from "sonner";
import {
    Search,
    Eye,
    ChevronLeft,
    ChevronRight,
    RefreshCw,
    Filter,
    X,
    ClipboardList,
    CheckCircle,
    Clock,
    AlertCircle,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const defaultAvatar =
    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
    });
}

const PRIORITY_STYLES: Record<TaskPriority, string> = {
    LOW: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
    MEDIUM: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    URGENT: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const STATUS_STYLES: Record<TaskStatus, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    IN_PROGRESS: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    COMPLETED: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: any; color: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-card border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon size={18} />
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}

// ─── Filter Chip ──────────────────────────────────────────────────────────────

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            {label}
            <button onClick={onRemove} className="hover:text-red-500 ml-0.5">
                <X size={10} />
            </button>
        </span>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TaskManagement() {
    // Data state
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    // Stats (derived from current page data)
    const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

    // Pagination
    const [page, setPage] = useState(0);
    const [size] = useState(10);

    // Filter state
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedPriority, setSelectedPriority] = useState<string>("");

    // Modal
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // ── Fetch tasks ──────────────────────────────────────────────────────────

    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await taskService.getAdminTasks({
                page,
                size,
                search: search || undefined,
                status: selectedStatus || undefined,
                priority: selectedPriority || undefined,
            });
            setTasks(result.content);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);

            // Derive stats from current page slice
            const s = result.content;
            setStats({
                total: result.totalElements,
                pending: s.filter(t => t.status === "PENDING").length,
                inProgress: s.filter(t => t.status === "IN_PROGRESS").length,
                completed: s.filter(t => t.status === "COMPLETED").length,
            });
        } catch (e: any) {
            toast.error(e.message || "Failed to load tasks");
        } finally {
            setIsLoading(false);
        }
    }, [page, size, search, selectedStatus, selectedPriority]);

    useEffect(() => { fetchTasks(); }, [fetchTasks]);

    // Reset page when filters change
    useEffect(() => { setPage(0); }, [search, selectedStatus, selectedPriority]);

    // ── Open detail (fetch full task from API) ───────────────────────────────

    const handleViewTask = async (taskId: string) => {
        try {
            const detail = await taskService.getAdminTaskById(taskId);
            setSelectedTask(detail);
        } catch (e: any) {
            toast.error(e.message || "Failed to load task detail");
        }
    };

    // ── Other handlers ───────────────────────────────────────────────────────

    const handleSearch = () => setSearch(searchInput.trim());
    const clearFilters = () => {
        setSearch(""); setSearchInput("");
        setSelectedStatus(""); setSelectedPriority(""); setPage(0);
    };
    const hasFilters = search || selectedStatus || selectedPriority;

    // ── Table columns ────────────────────────────────────────────────────────

    const columns: Column<Task>[] = [
        {
            header: "SL", flex: 0.4,
            render: (_, index) => (
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {page * size + index + 1}
                </span>
            ),
        },
        {
            header: "Task", flex: 2,
            render: (item) => (
                <div className="flex flex-col px-1">
                    <span className="text-sm font-bold dark:text-gray-100 truncate">{item.title}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">{item.category}</span>
                </div>
            ),
        },
        {
            header: "Employer", flex: 1.2,
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-xs font-semibold dark:text-gray-200 truncate">
                        {item.employer
                            ? (`${item.employer.user?.firstName ?? ""} ${item.employer.user?.lastName ?? ""}`.trim() || item.employer.user?.email)
                            : "—"}
                    </span>
                    {item.employer?.companyName && (
                        <span className="text-[9px] text-gray-400 truncate">{item.employer.companyName}</span>
                    )}
                </div>
            ),
        },
        {
            header: "Priority", flex: 0.8,
            render: (item) => (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${PRIORITY_STYLES[item.priority]}`}>
                    {item.priority}
                </span>
            ),
        },
        {
            header: "Status", flex: 0.9,
            render: (item) => (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${STATUS_STYLES[item.status]}`}>
                    {item.status.replace("_", " ")}
                </span>
            ),
        },
        {
            header: "Dates", flex: 1.2,
            render: (item) => (
                <div className="flex flex-col text-[10px] dark:text-gray-400">
                    <span>Start: {formatDate(item.startDate)}</span>
                    <span>End: &nbsp;&nbsp;{formatDate(item.endDate)}</span>
                </div>
            ),
        },
        {
            header: "Assigned", flex: 1.4,
            render: (item) => (
                <div className="flex items-center gap-1">
                    {/* Stacked avatars */}
                    <div className="flex -space-x-2">
                        {item.assignments.slice(0, 4).map((a) => (
                            <div
                                key={a.id}
                                className="w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-gray-900 shrink-0"
                                title={`${a.employee.firstName} ${a.employee.lastName}`}
                            >
                                <img
                                    src={a.employee.profileImage || defaultAvatar}
                                    alt={`${a.employee.firstName} ${a.employee.lastName}`}
                                    className="w-full h-full object-cover"
                                    onError={e => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                                />
                            </div>
                        ))}
                        {item.assignments.length > 4 && (
                            <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[9px] font-bold text-gray-600 dark:text-gray-300">
                                +{item.assignments.length - 4}
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] text-gray-400 ml-1">{item.assignments.length}</span>
                </div>
            ),
        },
        {
            header: "Progress", flex: 1,
            render: (item) => {
                const done = item.assignments.filter(a => a.status === "COMPLETED").length;
                const total = item.assignments.length;
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                    <div className="flex flex-col gap-1 w-full px-1">
                        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${pct === 100 ? "bg-green-500" : "bg-[#125BAC]"}`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="text-[9px] text-gray-400">{done}/{total} done · {pct}%</span>
                    </div>
                );
            },
        },
        {
            header: "Action", flex: 0.5,
            render: (item) => (
                <button
                    onClick={() => handleViewTask(item.id)}
                    className="flex items-center gap-1 text-[10px] font-bold text-[#125BAC] dark:text-blue-400 hover:underline"
                >
                    <Eye size={13} /> View
                </button>
            ),
        },
    ];

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="w-full h-full p-6 bg-transparent space-y-6">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Task & Rota</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {totalElements.toLocaleString()} total tasks across all employers
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={fetchTasks}
                    className="dark:border-gray-800 dark:text-gray-300 dark:bg-card"
                >
                    <RefreshCw size={14} className="mr-1.5" /> Refresh
                </Button>
            </div>

            {/* ── Stats Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Tasks" value={stats.total} icon={ClipboardList}
                    color="bg-blue-100 text-[#125BAC] dark:bg-blue-900/30 dark:text-blue-400" />
                <StatCard label="Pending" value={stats.pending} icon={Clock}
                    color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" />
                <StatCard label="In Progress" value={stats.inProgress} icon={AlertCircle}
                    color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" />
                <StatCard label="Completed" value={stats.completed} icon={CheckCircle}
                    color="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" />
            </div>

            {/* ── Filters ── */}
            <div className="flex flex-wrap gap-3 items-end p-4 rounded-xl bg-white dark:bg-card border border-gray-100 dark:border-gray-800">
                {/* Search */}
                <div className="flex gap-2 flex-1 min-w-50">
                    <Input
                        placeholder="Search by title or category…"
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSearch()}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                    <Button onClick={handleSearch} className="bg-[#125BAC] dark:bg-blue-600 text-white px-3">
                        <Search size={15} />
                    </Button>
                </div>

                {/* Status filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 gap-1.5">
                            <Filter size={13} />
                            {selectedStatus ? selectedStatus.replace("_", " ") : "All Status"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-2 mt-2" align="start">
                        <DropdownMenuLabel className="font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200 text-xs">Status</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {(["", "PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const).map(s => (
                                <DropdownMenuItem
                                    key={s || "all-status"}
                                    className="cursor-pointer dark:text-gray-300 text-xs"
                                    onClick={() => setSelectedStatus(s)}
                                >
                                    {s ? s.replace("_", " ") : "All Status"}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Priority filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 gap-1.5">
                            <Filter size={13} />
                            {selectedPriority || "All Priority"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-2 mt-2" align="start">
                        <DropdownMenuLabel className="font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200 text-xs">Priority</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            {(["", "LOW", "MEDIUM", "HIGH", "URGENT"] as const).map(p => (
                                <DropdownMenuItem
                                    key={p || "all-priority"}
                                    className="cursor-pointer dark:text-gray-300 text-xs"
                                    onClick={() => setSelectedPriority(p)}
                                >
                                    {p || "All Priority"}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Clear */}
                {hasFilters && (
                    <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="dark:border-gray-700 text-red-500 dark:text-red-400 text-xs gap-1"
                    >
                        <X size={12} /> Clear
                    </Button>
                )}
            </div>

            {/* ── Active filter chips ── */}
            {hasFilters && (
                <div className="flex flex-wrap gap-2">
                    {search && <Chip label={`Search: ${search}`} onRemove={() => { setSearch(""); setSearchInput(""); }} />}
                    {selectedStatus && <Chip label={`Status: ${selectedStatus.replace("_", " ")}`} onRemove={() => setSelectedStatus("")} />}
                    {selectedPriority && <Chip label={`Priority: ${selectedPriority}`} onRemove={() => setSelectedPriority("")} />}
                </div>
            )}

            {/* ── Table ── */}
            <ReusableTable
                columns={columns}
                data={tasks}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={page}
                emptyMessage="No tasks found."
            />

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Page {page + 1} of {totalPages} · {totalElements.toLocaleString()} tasks
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline" size="sm"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="dark:border-gray-700 dark:text-gray-300"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                            const start = Math.max(0, Math.min(page - 3, totalPages - 7));
                            const p = start + i;
                            return (
                                <Button
                                    key={p}
                                    variant={p === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setPage(p)}
                                    className={p === page ? "bg-[#125BAC] text-white" : "dark:border-gray-700 dark:text-gray-300"}
                                >
                                    {p + 1}
                                </Button>
                            );
                        })}
                        <Button
                            variant="outline" size="sm"
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            className="dark:border-gray-700 dark:text-gray-300"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}

            {/* ── Task Detail Modal ── */}
            {selectedTask && (
                <TaskDetailModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </div>
    );
}
