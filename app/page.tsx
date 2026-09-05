
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  FileText,
  FolderGit2,
  Terminal,
  Zap,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <nav className="border-b border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-mono text-base font-bold sm:text-lg"
          >
            <span className="text-primary">&gt;_</span>
            DevJournal
          </Link>

          <div className="flex min-w-0 items-center gap-1 sm:gap-2">
            <ModeToggle />

            <Link
              href="/login"
              className="rounded-md px-2.5 py-2 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-4 sm:text-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-2 font-mono text-xs text-primary transition-colors hover:bg-primary/20 sm:px-4 sm:text-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-32 sm:pt-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="min-w-0">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 font-mono text-xs text-muted-foreground sm:mb-6">
                <span className="text-primary">$</span>
                <span className="truncate">devjournal init</span>
              </div>

              <h1 className="max-w-3xl break-words font-mono text-3xl font-bold leading-tight tracking-tight sm:text-6xl">
                Your code.
                <br />
                Your knowledge.
                <br />
                <span className="text-primary">Your journey.</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-7">
                A personal developer workspace to organize your projects,
                technical notes, and reusable code snippets — so you never
                lose what you've learned.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:opacity-90"
                >
                  Start Building
                  <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-sm font-medium transition-colors hover:bg-muted"
                >
                  <Terminal className="size-4 shrink-0" />
                  Sign In
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground sm:mt-8">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  Projects
                </span>

                <span className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  Notes
                </span>

                <span className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                  Snippets
                </span>
              </div>
            </div>

            <div className="relative min-w-0">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
                <div className="flex items-center border-b border-border bg-muted/30 px-3 py-3 sm:px-4">
                  <div className="flex shrink-0 gap-1.5">
                    <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                  </div>

                  <div className="mx-auto max-w-[60%] truncate font-mono text-[10px] text-muted-foreground sm:text-[11px]">
                    santusht@devjournal: ~
                  </div>
                </div>

                <div className="space-y-5 p-4 font-mono text-xs sm:p-7 sm:text-sm">
                  <div>
                    <span className="text-primary">$</span>{" "}
                    <span className="text-foreground">
                      devjournal status
                    </span>
                  </div>

                  <div className="space-y-2 border-l border-border pl-3 text-muted-foreground sm:pl-4">
                    <p>
                      <span className="text-primary">✓</span>{" "}
                      Workspace initialized
                    </p>

                    <p>
                      <span className="text-primary">✓</span>{" "}
                      Projects connected
                    </p>

                    <p>
                      <span className="text-primary">✓</span>{" "}
                      Knowledge synced
                    </p>

                    <p>
                      <span className="text-primary">✓</span>{" "}
                      Snippets ready
                    </p>
                  </div>

                  <div className="rounded-lg border border-border bg-background/60 p-3 sm:p-4">
                    <div className="mb-4 flex min-w-0 items-center gap-2 text-muted-foreground">
                      <Terminal className="size-4 shrink-0 text-primary" />
                      <span className="truncate">~/devjournal</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <TerminalStat
                        icon={<FolderGit2 className="size-4" />}
                        value="12"
                        label="projects"
                      />

                      <TerminalStat
                        icon={<FileText className="size-4" />}
                        value="48"
                        label="notes"
                      />

                      <TerminalStat
                        icon={<Code2 className="size-4" />}
                        value="36"
                        label="snippets"
                      />
                    </div>
                  </div>

                  <div className="break-words">
                    <span className="text-primary">$</span>{" "}
                    <span className="text-muted-foreground">
                      ready to build
                    </span>
                    <span className="ml-1 animate-pulse text-primary">
                      _
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <Zap className="size-3.5 shrink-0" />
              developer workspace
            </div>

            <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
              Everything you need.
              <br />
              <span className="text-muted-foreground">
                Nothing you don't.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Keep your development journey organized with simple tools
              designed around how developers actually work.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
            <FeatureCard
              icon={<FolderGit2 className="size-5" />}
              command="projects"
              title="Projects"
              description="Keep your development projects, descriptions, and GitHub repositories organized."
            />

            <FeatureCard
              icon={<FileText className="size-5" />}
              command="notes"
              title="Notes"
              description="Capture technical concepts, ideas, learning notes, and important knowledge."
            />

            <FeatureCard
              icon={<Code2 className="size-5" />}
              command="snippets"
              title="Snippets"
              description="Save reusable code and solutions so you can find them whenever you need them."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                built for developers
              </p>

              <h2 className="mt-4 break-words font-mono text-2xl font-bold sm:text-3xl">
                Turn your learning into a personal knowledge base.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                Every project you build, every concept you learn, and every
                useful piece of code you write can become part of your
                personal developer history.
              </p>

              <Link
                href="/register"
                className="mt-7 inline-flex items-center gap-2 font-mono text-sm font-medium text-primary hover:underline"
              >
                Create your workspace
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            </div>

            <div className="max-w-full overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-xs leading-7 shadow-lg sm:p-7">
              <div className="min-w-[280px]">
                <p>
                  <span className="text-primary">const</span>{" "}
                  <span className="text-foreground">developer</span>{" "}
                  = {"{"}
                </p>

                <p className="pl-5">
                  projects:{" "}
                  <span className="text-muted-foreground">
                    "organized"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  knowledge:{" "}
                  <span className="text-muted-foreground">
                    "documented"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  snippets:{" "}
                  <span className="text-muted-foreground">
                    "reusable"
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  journey:{" "}
                  <span className="text-primary">"tracked"</span>
                </p>

                <p>{"};"}</p>

                <p className="mt-4">
                  <span className="text-primary">console</span>.
                  <span className="text-foreground">log</span>(
                  <span className="text-muted-foreground">
                    "Keep building."
                  </span>
                  );
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <div className="mx-auto flex size-12 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Terminal className="size-5" />
          </div>

          <h2 className="mt-6 break-words font-mono text-2xl font-bold sm:text-3xl">
            Ready to start your journal?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            Create your workspace and start documenting the things you build
            and learn.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex max-w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 font-mono text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:opacity-90 sm:px-6"
          >
            $ create-account
            <ArrowRight className="size-4 shrink-0" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:px-6 sm:text-left md:flex-row">
          <div className="flex items-center gap-2 font-mono text-sm font-semibold">
            <span className="text-primary">&gt;_</span>
            DevJournal
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
            <Link
              href="/login"
              className="hover:text-foreground"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="hover:text-foreground"
            >
              Sign Up
            </Link>

            <span className="flex items-center gap-1.5">
              <Terminal className="size-3.5" />
              Developer Workspace
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function TerminalStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="min-w-0 rounded-md border border-border/70 p-2 sm:p-3">
      <div className="text-primary">{icon}</div>

      <p className="mt-2 text-lg font-bold text-foreground">
        {value}
      </p>

      <p className="truncate text-[10px] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  icon,
  command,
  title,
  description,
}: {
  icon: React.ReactNode;
  command: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-xl border border-border/70 bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-primary">
          {icon}
        </div>

        <span className="truncate font-mono text-[10px] text-muted-foreground">
          /{command}
        </span>
      </div>

      <h3 className="mt-6 font-mono text-base font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-5 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
        $ open /{command}
      </div>
    </div>
  );
}
