import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { IoLogInOutline } from "react-icons/io5";

export default function Dashboard() {
     const { user, logout } = useAuth();

     return (
          <main className="min-h-screen bg-background text-foreground">
               <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                         <div>
                              <p className="text-sm text-muted-foreground">
                                   Welcome back
                              </p>

                              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                                   {user?.name || "Student"}
                              </h1>
                         </div>

                         <Link
                              to="/"
                              className="inline-flex w-fit items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                         >
                              Back to Home
                         </Link>

                         <IoLogInOutline size={30} className="cursor-pointer" onClick={logout}/>
                    </div>

                    {/* Quick Stats */}
                    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                         <div className="rounded-xl border border-border bg-card p-5">
                              <p className="text-sm text-muted-foreground">
                                   Study Hours
                              </p>
                              <p className="mt-2 text-3xl font-semibold">0</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                   This week
                              </p>
                         </div>

                         <div className="rounded-xl border border-border bg-card p-5">
                              <p className="text-sm text-muted-foreground">
                                   Subjects
                              </p>
                              <p className="mt-2 text-3xl font-semibold">0</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                   Currently studying
                              </p>
                         </div>

                         <div className="rounded-xl border border-border bg-card p-5">
                              <p className="text-sm text-muted-foreground">
                                   Tasks
                              </p>
                              <p className="mt-2 text-3xl font-semibold">0</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                   Pending
                              </p>
                         </div>

                         <div className="rounded-xl border border-border bg-card p-5">
                              <p className="text-sm text-muted-foreground">
                                   Study Streak
                              </p>
                              <p className="mt-2 text-3xl font-semibold">
                                   0 days
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                   Keep going
                              </p>
                         </div>
                    </section>

                    {/* Main Content */}
                    <section className="mt-8 grid gap-6 lg:grid-cols-3">
                         {/* Recent Activity */}
                         <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
                              <div className="flex items-center justify-between">
                                   <div>
                                        <h2 className="text-lg font-semibold">
                                             Recent Activity
                                        </h2>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                             Your latest study activity
                                        </p>
                                   </div>
                              </div>

                              <div className="mt-8 flex min-h-48 items-center justify-center rounded-lg border border-dashed border-border">
                                   <div className="text-center">
                                        <p className="font-medium">
                                             No activity yet
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                             Start studying to see your activity
                                             here.
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Quick Actions */}
                         <div className="rounded-xl border border-border bg-card p-6">
                              <h2 className="text-lg font-semibold">
                                   Quick Actions
                              </h2>

                              <p className="mt-1 text-sm text-muted-foreground">
                                   Get started with your study tools.
                              </p>

                              <div className="mt-6 space-y-3">
                                   <Link
                                        to="/study"
                                        className="block rounded-lg border border-border p-4 transition hover:bg-muted"
                                   >
                                        <p className="font-medium">
                                             Start Studying
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                             Begin a focused study session.
                                        </p>
                                   </Link>

                                   <Link
                                        to="/subjects"
                                        className="block rounded-lg border border-border p-4 transition hover:bg-muted"
                                   >
                                        <p className="font-medium">
                                             View Subjects
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                             Manage your study subjects.
                                        </p>
                                   </Link>

                                   <Link
                                        to="/tasks"
                                        className="block rounded-lg border border-border p-4 transition hover:bg-muted"
                                   >
                                        <p className="font-medium">
                                             View Tasks
                                        </p>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                             Check your pending tasks.
                                        </p>
                                   </Link>
                              </div>
                         </div>
                    </section>
               </div>
          </main>
     );
}
