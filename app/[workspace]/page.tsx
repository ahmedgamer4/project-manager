'use client';

export default function WorkspacePage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-2xl text-muted-foreground">
          Welcome to your workspace
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select an item from the sidebar to get started
        </p>
      </div>
    </div>
  );
}
