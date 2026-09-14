import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
     const { isAuthenticated, user } = useAuth();
     
     console.log(user)

    return (
        <main className="min-h-screen bg-background text-foreground">
           
            <section className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pt-28">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-6 inline-flex rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                        Your personal study companion
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Study smarter.
                        <br />
                        <span className="text-primary">
                            Learn with confidence.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        Study Buddy helps you organize your learning, stay
                        focused, manage your study tasks, and make progress
                        without the usual chaos.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                                >
                                    Get Started
                                </Link>

                                <Link
                                    to="/login"
                                    className="rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-muted"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

         
            <section className="border-y border-border bg-card/50">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-medium text-primary">
                            Everything in one place
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                            Built for better studying
                        </h2>

                        <p className="mt-4 text-muted-foreground">
                            Keep your learning organized and focus on what
                            actually matters.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        <FeatureCard
                            title="Organize your studies"
                            description="Keep subjects, tasks, and study plans organized in one simple workspace."
                        />

                        <FeatureCard
                            title="Stay focused"
                            description="Create focused study sessions and build consistent learning habits."
                        />

                        <FeatureCard
                            title="Track your progress"
                            description="See your activity, study time, tasks, and progress as you learn."
                        />
                    </div>
                </div>
            </section>

         
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center sm:px-12">
                    <h2 className="text-3xl font-semibold tracking-tight">
                        Ready to study smarter?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                        Start organizing your learning and build a study
                        routine that works for you.
                    </p>

                    <div className="mt-8">
                        <Link
                            to={isAuthenticated ? "/dashboard" : "/register"}
                            className="inline-flex rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                        >
                            {isAuthenticated
                                ? "Open Dashboard"
                                : "Create Your Account"}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

interface FeatureCardProps {
    title: string;
    description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
    return (
        <div className="rounded-xl border border-border bg-background p-6">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-primary">
                +
            </div>

            <h3 className="text-lg font-semibold">{title}</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
            </p>
        </div>
    );
}

