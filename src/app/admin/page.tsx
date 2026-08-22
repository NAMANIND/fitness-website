"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { isValidUsername, normalizeUsername } from "@/lib/profile";

type ProfileRow = { username: string; name: string; updatedAt: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    void fetch("/api/admin/login")
      .then((r) => r.json())
      .then((body: { ok?: boolean }) => setAuthed(Boolean(body.ok)))
      .catch(() => setAuthed(false));
  }, []);

  useEffect(() => {
    if (!authed) return;
    void fetch("/api/admin/profiles")
      .then(async (r) => {
        if (!r.ok) throw new Error("load failed");
        return r.json() as Promise<{ profiles: ProfileRow[] }>;
      })
      .then((body) => setProfiles(body.profiles))
      .catch(() => setLoadError("Could not load profiles"));
  }, [authed]);

  async function login(event: FormEvent) {
    event.preventDefault();
    setLoginError(null);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setLoginError("Wrong password");
      return;
    }
    setAuthed(true);
    setPassword("");
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setProfiles([]);
  }

  async function createProfile(event: FormEvent) {
    event.preventDefault();
    const username = normalizeUsername(newUsername);
    if (!isValidUsername(username)) {
      setLoadError("Username must be 2–30 chars: letters, numbers, . or _");
      return;
    }
    setCreating(true);
    setLoadError(null);
    const response = await fetch("/api/admin/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    setCreating(false);
    if (response.status === 409) {
      setLoadError("Username already exists");
      return;
    }
    if (!response.ok) {
      setLoadError("Could not create profile");
      return;
    }
    window.location.href = `/admin/${encodeURIComponent(username)}`;
  }

  if (authed === null) {
    return <p className="p-8 text-neutral-400">Checking session…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
        <h1 className="mb-6 text-2xl font-bold">Admin</h1>
        <form onSubmit={login} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-xs uppercase tracking-wide text-neutral-400">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 outline-none focus:border-coral"
              autoFocus
            />
          </label>
          {loginError ? (
            <p className="text-sm text-red-400">{loginError}</p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-coral py-2.5 text-sm font-semibold text-white"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profiles</h1>
        <button
          type="button"
          onClick={() => void logout()}
          className="text-sm text-neutral-400 hover:text-white"
        >
          Sign out
        </button>
      </div>

      <form onSubmit={createProfile} className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="new_username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-coral"
        />
        <button
          type="submit"
          disabled={creating}
          className="rounded-lg bg-coral px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {creating ? "Creating…" : "New profile"}
        </button>
      </form>

      {loadError ? (
        <p className="mb-4 text-sm text-red-400">{loadError}</p>
      ) : null}

      {profiles.length === 0 ? (
        <p className="text-neutral-500">No profiles yet. Create one above.</p>
      ) : (
        <ul className="divide-y divide-neutral-800 rounded-xl border border-neutral-800">
          {profiles.map((profile) => (
            <li
              key={profile.username}
              className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-900"
            >
              <Link
                href={`/admin/${encodeURIComponent(profile.username)}`}
                className="min-w-0 flex-1"
              >
                <span className="font-mono font-medium">@{profile.username}</span>
                {profile.name ? (
                  <span className="mt-0.5 block truncate text-sm text-neutral-500">
                    {profile.name}
                  </span>
                ) : null}
              </Link>
              <span className="hidden shrink-0 text-xs text-neutral-500 sm:inline">
                {new Date(profile.updatedAt).toLocaleDateString()}
              </span>
              <a
                href={`/${encodeURIComponent(profile.username)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg border border-neutral-700 px-2.5 py-1.5 font-mono text-xs text-neutral-300 hover:border-coral hover:text-coral"
              >
                /{profile.username}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
