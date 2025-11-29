// 제보로 프로젝트 - 헤더 컴포넌트
// 핵심 규칙: 모바일 퍼스트, 카카오>네이버>구글 순서

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/about", label: "소개" },
    { href: "/for-reporters", label: "기자 전용" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600">
            <Mic className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">제보로</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 데스크톱 CTA 버튼 */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" asChild>
            <Link href="/login">로그인</Link>
          </Button>
          <Button asChild className="bg-linear-to-r from-blue-600 to-indigo-600">
            <Link href="/report/new">제보하기</Link>
          </Button>
        </div>

        {/* 모바일 메뉴 */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-gray-600 transition-colors hover:text-gray-900"
                >
                  {item.label}
                </Link>
              ))}
              <hr className="my-4" />
              <Button variant="outline" asChild className="w-full">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  로그인
                </Link>
              </Button>
              <Button asChild className="w-full bg-linear-to-r from-blue-600 to-indigo-600">
                <Link href="/report/new" onClick={() => setIsOpen(false)}>
                  제보하기
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

