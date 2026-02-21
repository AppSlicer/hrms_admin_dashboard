import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Input } from "@/components/ui/input.tsx";
import ReusableTable, { type Column } from "@/components/ui/ReusableTable";
import { auditLogService, type AuditLog, type AuditStats } from "@/services/auditLog.service";
import { toast } from "sonner";
import {
    ChevronLeft,
    ChevronRight,
    X,
    Search,
    RefreshCw,
    ShieldCheck,
    ShieldX,
    Activity,
    ClipboardList,
    Filter,
    Trash2,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
    });
}

function actionLabel(action: string) {
    return action.replace(/_/g, " ");
}

const STATUS_COLORS: Record<string, string> = {
    SUCCESS: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    FAILURE: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

const ACTION_COLORS = [
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400",
];

function actionColor(action: string) {
    let hash = 0;
    for (let i = 0; i < action.length; i++) hash = action.charCodeAt(i) + ((hash << 5) - hash);
    return ACTION_COLORS[Math.abs(hash) % ACTION_COLORS.length];
}

// ─── Stats Card ───────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number | string; icon: any; color: string }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-card border border-gray-100 dark:border-gray-800 shadow-sm">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────

function DetailModal({ log, onClose }: { log: AuditLog; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Audit Log Detail</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{log.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    {/* Status + Action row */}
                    <div className="flex flex-wrap gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${STATUS_COLORS[log.status] ?? "bg-gray-100 text-gray-600"}`}>
                            {log.status}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${actionColor(log.action)}`}>
                            {actionLabel(log.action)}
                        </span>
                    </div>

                    {/* Grid info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoRow label="Timestamp" value={formatDate(log.createdAt)} />
                        <InfoRow label="User Email" value={log.userEmail ?? "—"} />
                        <InfoRow label="User Role" value={log.userRole ?? "—"} />
                        <InfoRow label="IP Address" value={log.ipAddress ?? "—"} mono />
                        <InfoRow label="Resource" value={log.resource ?? "—"} />
                        <InfoRow label="Resource ID" value={log.resourceId ?? "—"} mono />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            {log.description}
                        </p>
                    </div>

                    {/* Error message */}
                    {log.errorMessage && (
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">Error</p>
                            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 font-mono">
                                {log.errorMessage}
                            </p>
                        </div>
                    )}

                    {/* Metadata */}
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Metadata</p>
                            <pre className="text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 overflow-x-auto">
                                {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                        </div>
                    )}

                    {/* User Agent */}
                    {log.userAgent && (
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">User Agent</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 break-all font-mono">
                                {log.userAgent}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
    return (
        <div className="space-y-0.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
            <p className={`text-sm text-gray-800 dark:text-gray-200 ${mono ? "font-mono" : "font-medium"}`}>{value}</p>
        </div>
    );
}

// ─── Purge Modal ──────────────────────────────────────────────────────────────

function PurgeModal({ onClose, onPurged }: { onClose: () => void; onPurged: () => void }) {
    const [days, setDays] = useState(90);
    const [loading, setLoading] = useState(false);

    const handlePurge = async () => {
        if (!confirm(`This will permanently delete all audit logs older than ${days} days. Continue?`)) return;
        setLoading(true);
        try {
            const result = await auditLogService.purge(days);
            toast.success(`Purged ${result.deleted} audit log(s) older than ${days} days`);
            onPurged();
            onClose();
        } catch (e: any) {
            toast.error(e.message || "Purge failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Purge Old Logs</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                        <X size={16} className="text-gray-500" />
                    </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Delete all audit logs older than the specified number of days.
                </p>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase">Older than (days)</label>
                    <Input
                        type="number"
                        min={1}
                        value={days}
                        onChange={e => setDays(parseInt(e.target.value) || 1)}
                        className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                </div>
                <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1 dark:border-gray-700 dark:text-gray-300" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        onClick={handlePurge}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading ? "Purging…" : "Purge"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AuditLog() {
    // Data state
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [stats, setStats] = useState<AuditStats | null>(null);
    const [actions, setActions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    // Filter state
    const [page, setPage] = useState(0);
    const [size] = useState(15);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [selectedAction, setSelectedAction] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

    // UI state
    const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
    const [showPurge, setShowPurge] = useState(false);

    // ── Fetch logs ──────────────────────────────────────────────────────────

    const fetchLogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await auditLogService.getLogs({
                page,
                size,
                search: search || undefined,
                action: selectedAction || undefined,
                status: selectedStatus || undefined,
                userRole: selectedRole || undefined,
                fromDate: fromDate || undefined,
                toDate: toDate || undefined,
                sortDirection: sortDir,
            });
            setLogs(result.content);
            setTotalPages(result.totalPages);
            setTotalElements(result.totalElements);
        } catch (e: any) {
            toast.error(e.message || "Failed to load audit logs");
        } finally {
            setIsLoading(false);
        }
    }, [page, size, search, selectedAction, selectedStatus, selectedRole, fromDate, toDate, sortDir]);

    // ── Fetch stats & actions once ──────────────────────────────────────────

    const fetchStats = useCallback(async () => {
        try {
            const s = await auditLogService.getStats(fromDate || undefined, toDate || undefined);
            setStats(s);
        } catch {
            // non-critical
        }
    }, [fromDate, toDate]);

    const fetchActions = useCallback(async () => {
        try {
            const a = await auditLogService.getActions();
            setActions(a);
        } catch {
            // non-critical
        }
    }, []);

    useEffect(() => { fetchLogs(); }, [fetchLogs]);
    useEffect(() => { fetchStats(); }, [fetchStats]);
    useEffect(() => { fetchActions(); }, [fetchActions]);

    // Reset to page 0 when filters change
    useEffect(() => { setPage(0); }, [search, selectedAction, selectedStatus, selectedRole, fromDate, toDate]);

    // ── Handlers ────────────────────────────────────────────────────────────

    const handleSearch = () => {
        setSearch(searchInput.trim());
    };

    const clearFilters = () => {
        setSearch(""); setSearchInput("");
        setSelectedAction(""); setSelectedStatus("");
        setSelectedRole(""); setFromDate(""); setToDate("");
        setSortDir("desc"); setPage(0);
    };

    const hasFilters = search || selectedAction || selectedStatus || selectedRole || fromDate || toDate;

    // ── Table columns ────────────────────────────────────────────────────────

    const columns: Column<AuditLog>[] = [
        {
            header: "SL", flex: 0.4,
            render: (_, index) => (
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {page * size + index + 1}
                </span>
            ),
        },
        {
            header: "Timestamp", flex: 1.2,
            render: (item) => (
                <span className="text-[10px] dark:text-gray-400 font-medium leading-tight">
                    {formatDate(item.createdAt)}
                </span>
            ),
        },
        {
            header: "User",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-xs font-semibold dark:text-gray-200 truncate">{item.userEmail ?? "—"}</span>
                    {item.userRole && (
                        <span className="text-[9px] text-gray-400 uppercase tracking-wide">{item.userRole}</span>
                    )}
                </div>
            ),
        },
        {
            header: "Action", flex: 1.2,
            render: (item) => (
                <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${actionColor(item.action)}`}>
                    {actionLabel(item.action)}
                </span>
            ),
        },
        {
            header: "Resource",
            render: (item) => (
                <div className="flex flex-col">
                    <span className="text-xs font-medium dark:text-gray-300">{item.resource ?? "—"}</span>
                    {item.resourceId && (
                        <span className="text-[9px] text-gray-400 font-mono truncate max-w-[90px]">{item.resourceId}</span>
                    )}
                </div>
            ),
        },
        {
            header: "Description", flex: 1.8,
            render: (item) => (
                <span className="text-xs dark:text-gray-400 truncate block px-1" title={item.description}>
                    {item.description}
                </span>
            ),
        },
        {
            header: "IP", flex: 0.8,
            render: (item) => (
                <span className="text-[10px] dark:text-gray-500 font-mono">{item.ipAddress ?? "—"}</span>
            ),
        },
        {
            header: "Status", flex: 0.7,
            render: (item) => (
                <span className={`px-2 py-1 rounded-full text-[9px] font-black uppercase ${STATUS_COLORS[item.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {item.status}
                </span>
            ),
        },
        {
            header: "Detail", flex: 0.6,
            render: (item) => (
                <button
                    onClick={() => setSelectedLog(item)}
                    className="text-[10px] font-bold text-[#125BAC] dark:text-blue-400 hover:underline"
                >
                    View
                </button>
            ),
        },
    ];

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="w-full h-full p-6 bg-transparent space-y-6">

            {/* ── Header ── */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">System Audit Logs</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {totalElements.toLocaleString()} total records
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => { fetchLogs(); fetchStats(); }}
                        className="dark:border-gray-800 dark:text-gray-300 dark:bg-card"
                    >
                        <RefreshCw size={14} className="mr-1.5" /> Refresh
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setShowPurge(true)}
                        className="dark:border-gray-800 dark:text-gray-300 dark:bg-card text-red-500 dark:text-red-400 border-red-200 dark:border-red-900/40"
                    >
                        <Trash2 size={14} className="mr-1.5" /> Purge
                    </Button>
                </div>
            </div>

            {/* ── Stats Cards ── */}
            {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard
                        label="Total Logs"
                        value={stats.total.toLocaleString()}
                        icon={ClipboardList}
                        color="bg-blue-100 text-[#125BAC] dark:bg-blue-900/30 dark:text-blue-400"
                    />
                    <StatCard
                        label="Success"
                        value={stats.totalSuccess.toLocaleString()}
                        icon={ShieldCheck}
                        color="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    />
                    <StatCard
                        label="Failures"
                        value={stats.totalFailure.toLocaleString()}
                        icon={ShieldX}
                        color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    />
                    <StatCard
                        label="Success Rate"
                        value={`${stats.successRate}%`}
                        icon={Activity}
                        color="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    />
                </div>
            )}

            {/* ── Top Actions & By Role summary ── */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Top actions */}
                    <div className="p-4 rounded-xl bg-white dark:bg-card border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Top Actions</h3>
                        <div className="space-y-2">
                            {stats.topActions.slice(0, 6).map(a => (
                                <div key={a.action} className="flex items-center justify-between">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${actionColor(a.action)}`}>
                                        {actionLabel(a.action)}
                                    </span>
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{a.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* By Role */}
                    <div className="p-4 rounded-xl bg-white dark:bg-card border border-gray-100 dark:border-gray-800">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">By Role</h3>
                        <div className="space-y-2">
                            {stats.byRole.map(r => (
                                <div key={r.role} className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">{r.role}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 rounded-full bg-[#125BAC] dark:bg-blue-500"
                                            style={{ width: `${Math.min((r.count / (stats.total || 1)) * 120, 120)}px` }}
                                        />
                                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300 w-8 text-right">{r.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Filters ── */}
            <div className="flex flex-wrap gap-3 items-end p-4 rounded-xl bg-white dark:bg-card border border-gray-100 dark:border-gray-800">
                {/* Search */}
                <div className="flex gap-2 flex-1 min-w-[200px]">
                    <Input
                        placeholder="Search description or email…"
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSearch()}
                        className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
                    />
                    <Button onClick={handleSearch} className="bg-[#125BAC] dark:bg-blue-600 text-white px-3">
                        <Search size={15} />
                    </Button>
                </div>

                {/* Action filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 gap-1.5">
                            <Filter size={13} />
                            {selectedAction ? actionLabel(selectedAction) : "All Actions"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-2 mt-2" align="start">
                        <DropdownMenuLabel className="font-semibold border-b dark:border-gray-800 pb-2 dark:text-gray-200">Action Type</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer dark:text-gray-300" onClick={() => setSelectedAction("")}>
                                All Actions
                            </DropdownMenuItem>
                            {actions.map(a => (
                                <DropdownMenuItem key={a} className="cursor-pointer dark:text-gray-300 text-xs" onClick={() => setSelectedAction(a)}>
                                    {actionLabel(a)}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Status filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 gap-1.5">
                            <Filter size={13} />
                            {selectedStatus || "All Status"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-2 mt-2" align="start">
                        <DropdownMenuGroup>
                            {["", "SUCCESS", "FAILURE"].map(s => (
                                <DropdownMenuItem key={s || "all"} className="cursor-pointer dark:text-gray-300" onClick={() => setSelectedStatus(s)}>
                                    {s || "All Status"}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Role filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 gap-1.5">
                            <Filter size={13} />
                            {selectedRole || "All Roles"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-2 mt-2" align="start">
                        <DropdownMenuGroup>
                            {["", "SUPER_ADMIN", "SUB_ADMIN", "EMPLOYER", "EMPLOYEE"].map(r => (
                                <DropdownMenuItem key={r || "all"} className="cursor-pointer dark:text-gray-300 text-xs" onClick={() => setSelectedRole(r)}>
                                    {r || "All Roles"}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Date range */}
                <div className="flex gap-2 items-center">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={e => setFromDate(e.target.value)}
                        className="text-xs px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                        title="From date"
                    />
                    <span className="text-gray-400 text-xs">to</span>
                    <input
                        type="date"
                        value={toDate}
                        onChange={e => setToDate(e.target.value)}
                        className="text-xs px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white"
                        title="To date"
                    />
                </div>

                {/* Sort direction */}
                <Button
                    variant="outline"
                    onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
                    className="dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900 text-xs"
                >
                    {sortDir === "desc" ? "Newest first" : "Oldest first"}
                </Button>

                {/* Clear */}
                {hasFilters && (
                    <Button variant="outline" onClick={clearFilters} className="dark:border-gray-700 dark:text-gray-300 text-red-500 dark:text-red-400 text-xs gap-1">
                        <X size={12} /> Clear
                    </Button>
                )}
            </div>

            {/* ── Active filter chips ── */}
            {hasFilters && (
                <div className="flex flex-wrap gap-2">
                    {search && <Chip label={`Search: ${search}`} onRemove={() => { setSearch(""); setSearchInput(""); }} />}
                    {selectedAction && <Chip label={`Action: ${actionLabel(selectedAction)}`} onRemove={() => setSelectedAction("")} />}
                    {selectedStatus && <Chip label={`Status: ${selectedStatus}`} onRemove={() => setSelectedStatus("")} />}
                    {selectedRole && <Chip label={`Role: ${selectedRole}`} onRemove={() => setSelectedRole("")} />}
                    {fromDate && <Chip label={`From: ${fromDate}`} onRemove={() => setFromDate("")} />}
                    {toDate && <Chip label={`To: ${toDate}`} onRemove={() => setToDate("")} />}
                </div>
            )}

            {/* ── Table ── */}
            <ReusableTable
                columns={columns}
                data={logs}
                isLoading={isLoading}
                totalPages={totalPages}
                currentPage={page}
                emptyMessage="No audit logs found."
            />

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Page {page + 1} of {totalPages} · {totalElements.toLocaleString()} records
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="dark:border-gray-700 dark:text-gray-300"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        {/* Page number chips */}
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
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages - 1}
                            onClick={() => setPage(p => p + 1)}
                            className="dark:border-gray-700 dark:text-gray-300"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}

            {/* ── Detail Modal ── */}
            {selectedLog && (
                <DetailModal log={selectedLog} onClose={() => setSelectedLog(null)} />
            )}

            {/* ── Purge Modal ── */}
            {showPurge && (
                <PurgeModal
                    onClose={() => setShowPurge(false)}
                    onPurged={() => { fetchLogs(); fetchStats(); }}
                />
            )}
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
