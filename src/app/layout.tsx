import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  Home,
  BookOpen,
  BookCopy,
  ListChecks,
  Trophy,
  Globe,
  Menu,
  Search,
  Gamepad2,
} from 'lucide-react';
import { EcoQuestLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'EcoQuest',
  description: 'Gamified Environmental Education Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased')}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                <EcoQuestLogo className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold font-headline text-sidebar-primary group-data-[collapsible=icon]:hidden">
                  EcoQuest
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Home">
                    <Link href="/">
                      <Home />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Lessons">
                    <Link href="/lessons">
                      <BookOpen />
                      <span>Lessons</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Subjects">
                    <Link href="/subjects">
                      <BookCopy />
                      <span>Subjects</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Games">
                    <Link href="/games">
                      <Gamepad2 />
                      <span>Games</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Quizzes">
                    <Link href="/quizzes">
                      <ListChecks />
                      <span>Quizzes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Leaderboard">
                    <Link href="/leaderboard">
                      <Trophy />
                      <span>Leaderboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Resources">
                    <Link href="/resources">
                      <Globe />
                      <span>Resources</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="overflow-hidden rounded-full"
                  >
                    <Image
                        src="https://images.pexels.com/photos/31683335/pexels-photo-31683335.jpeg"
                        alt="User profile picture"
                        width={36}
                        height={36}
                        className="object-cover"
                    />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0 space-y-4">
              {children}
              <Toaster />
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
