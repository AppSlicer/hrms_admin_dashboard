import { X, Calendar, Clock, Users, Paperclip, FileText, Tag, AlertCircle } from "lucide-react";
import type { Task, TaskStatus, TaskPriority } from "@/services/task.service";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const defaultAvatar =
  "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
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

const ASSIGN_STATUS_STYLES: Record<TaskStatus, string> = {
  PENDING: "border-yellow-400 text-yellow-600 dark:text-yellow-400",
  IN_PROGRESS: "border-blue-400 text-blue-600 dark:text-blue-400",
  COMPLETED: "border-green-400 text-green-600 dark:text-green-400",
  CANCELLED: "border-red-400 text-red-500 dark:text-red-400",
};

// ─── Props ─────────────────────────────────────────────────────────────────

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  const completedCount = task.assignments.filter(a => a.status === "COMPLETED").length;
  const totalCount = task.assignments.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto border border-gray-200 dark:border-gray-700">

        {/* ── Header ── */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex-1 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${STATUS_STYLES[task.status]}`}>
                {task.status.replace("_", " ")}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${PRIORITY_STYLES[task.priority]}`}>
                {task.priority}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-bold uppercase">
                {task.category}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{task.title}</h2>
            {task.employer && (
              <p className="text-xs text-gray-400 mt-0.5">
                by {task.employer.user?.firstName} {task.employer.user?.lastName}
                {task.employer.companyName ? ` · ${task.employer.companyName}` : ""}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* ── Key Info Grid ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <InfoCard icon={Calendar} label="Start Date" value={formatDate(task.startDate)} />
            <InfoCard icon={Calendar} label="End Date" value={formatDate(task.endDate)} />
            <InfoCard icon={Clock} label="Break Time" value={task.breakTime ? `${task.breakTime} min` : "—"} />
            <InfoCard
              icon={Users}
              label="Assigned To"
              value={`${totalCount} employee${totalCount !== 1 ? "s" : ""}`}
            />
          </div>

          {/* ── Description ── */}
          <div className="space-y-2">
            <SectionHeader icon={FileText} title="Description" />
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* ── Assigned Employees ── */}
          {task.assignments.length > 0 && (
            <div className="space-y-2">
              <SectionHeader icon={Users} title={`Assigned Employees (${completedCount}/${totalCount} completed)`} />
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : "0%" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {task.assignments.map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${ASSIGN_STATUS_STYLES[a.status]} bg-white dark:bg-gray-800/50`}
                  >
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 flex-shrink-0">
                      <img
                        src={a.employee.profileImage || defaultAvatar}
                        alt={`${a.employee.firstName} ${a.employee.lastName}`}
                        className="w-full h-full object-cover"
                        onError={e => { (e.target as HTMLImageElement).src = defaultAvatar; }}
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {a.employee.firstName} {a.employee.lastName}
                      </p>
                      <p className="text-[10px] text-gray-400 truncate">
                        {a.employee.companyInfo?.designation || a.employee.user?.email || a.employee.employeeCode || "—"}
                      </p>
                    </div>
                    {/* Status pill */}
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${ASSIGN_STATUS_STYLES[a.status]}`}>
                      {a.status.replace("_", " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Attachments ── */}
          {task.attachments.length > 0 && (
            <div className="space-y-2">
              <SectionHeader icon={Paperclip} title={`Attachments (${task.attachments.length})`} />
              <div className="flex flex-wrap gap-2">
                {task.attachments.map((url, i) => {
                  const filename = url.split("/").pop() || `Attachment ${i + 1}`;
                  const isImage = /\.(png|jpg|jpeg|webp|gif)$/i.test(filename);
                  return isImage ? (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:opacity-80 transition-opacity"
                    >
                      <img src={url} alt={filename} className="w-full h-full object-cover" />
                    </a>
                  ) : (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Paperclip size={12} />
                      <span className="truncate max-w-[120px]">{filename}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Task Notes ── */}
          {task.notes.length > 0 && (
            <div className="space-y-2">
              <SectionHeader icon={Tag} title={`Updates & Notes (${task.notes.length})`} />
              <div className="space-y-2">
                {task.notes.map((note) => (
                  <div key={note.id} className="flex gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <div className="w-1.5 rounded-full bg-[#125BAC] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">{note.note}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{formatDateTime(note.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Meta ── */}
          <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400">
            <span>Created: {formatDateTime(task.createdAt)}</span>
            <span>Updated: {formatDateTime(task.updatedAt)}</span>
            <span className="font-mono">ID: {task.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-[#125BAC] dark:text-blue-400 flex-shrink-0" />
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{title}</h3>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold uppercase tracking-wide">
        <Icon size={11} />
        {label}
      </div>
      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{value}</p>
    </div>
  );
}

// Suppress unused import warning for AlertCircle (it's exported for potential future use)
export { AlertCircle };
