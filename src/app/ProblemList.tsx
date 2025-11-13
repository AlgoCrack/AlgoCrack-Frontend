'use client';

import { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircle } from 'lucide-react';

type Problem = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export default function ProblemListPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const pageSize = 10;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchProblems = async (page: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ALGOCRACK_BACKEND}/api/problem?page=${page}&pageSize=${pageSize}`
      );
      const data = await res.json();
      setProblems(data);
      setHasNextPage(data.length === pageSize);
    } catch (err) {
      console.error('Error fetching problems:', err);
    }
  };

  useEffect(() => {
    fetchProblems(page);
  }, [page]);

  const handleLogin = () => {
    // TODO: integrate with real auth API
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // TODO: clear token or session
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 🔹 Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">AlgoCrack</h1>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center focus:outline-none">
            <UserCircle className="h-8 w-8 text-gray-700" />
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            {isLoggedIn ? (
              <>
                <MenuItem>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                    >
                      Profile
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                    >
                      登出
                    </button>
                  )}
                </MenuItem>
              </>
            ) : (
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleLogin}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    登入
                  </button>
                )}
              </MenuItem>
            )}
          </MenuItems>
        </Menu>
      </nav>

      {/* 🔹 Main Content */}
      <main className="flex-1 flex justify-center items-start py-10">
        <div className="bg-white rounded-2xl shadow p-4 w-full max-w-3xl">
          <ul className="divide-y divide-gray-200">
            {problems.map((p) => (
              <li
                key={p.id}
                className="py-3 px-4 hover:bg-gray-50 transition-colors text-gray-800 font-medium"
              >
                {p.title}
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md text-sm ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              上一頁
            </button>

            <span className="text-sm text-gray-500">第 {page} 頁</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage}
              className={`px-4 py-2 rounded-md text-sm ${
                !hasNextPage
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              下一頁
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
