'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal, ArrowUpDown, Search } from 'lucide-react';
import { getUsers, updateUserRole, deleteUser } from '@/actions/admin';
import { useToast } from '@/hooks/use-toast';
import { userSchema, User, Role } from '@/lib/schemas/admin/users';
import { UserSearchResult } from '@/types/prisma';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const deleteUserSchema = z.object({
  confirmText: z.literal('DELETE', {
    errorMap: () => ({ message: "Please type 'DELETE' to confirm" }),
  }),
});

type DeleteUserFormData = z.infer<typeof deleteUserSchema>;

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof User>('email');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteUserFormData>({
    resolver: zodResolver(deleteUserSchema),
  });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { users, totalCount } = await getUsers({
        page: currentPage,
        pageSize,
        sortColumn,
        sortDirection,
        searchTerm: debouncedSearchTerm,
      });
      const parsedUsers = users.map((user: UserSearchResult) => userSchema.parse(user));
      setUsers(parsedUsers);
      setTotalPages(Math.ceil(totalCount / pageSize));
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Unable to fetch users',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    toast,
    currentPage,
    pageSize,
    sortColumn,
    sortDirection,
    debouncedSearchTerm,
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSort = (column: keyof User) => {
    setSortDirection(
      column === sortColumn && sortDirection === 'asc' ? 'desc' : 'asc'
    );
    setSortColumn(column);
    setCurrentPage(1);
  };

  const handleUpdateRole = useCallback(
    async (userId: string, newRole: Role) => {
      try {
        await updateUserRole(userId, newRole);
        toast({
          title: 'Success',
          description: "User's role updated",
        });
        fetchUsers();
      } catch (error) {
        toast({
          title: 'Error',
          description:
            error instanceof Error ? error.message : 'Unable to update role',
          variant: 'destructive',
        });
      }
    },
    [fetchUsers, toast]
  );

  const handleDeleteUser = useCallback(async (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  }, []);

  const onConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete);
      toast({ title: 'Success', description: 'User deleted' });
      fetchUsers();
    } catch (error) {
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Unable to delete user',
        variant: 'destructive',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      reset();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="text-white" onClick={fetchUsers}>
            Refresh
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort('name')}
              className="cursor-pointer"
            >
              Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead
              onClick={() => handleSort('email')}
              className="cursor-pointer"
            >
              Email <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead
              onClick={() => handleSort('role')}
              className="cursor-pointer"
            >
              Role <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? Array.from({ length: 11 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            : users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name || 'N/A'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role}
                      onValueChange={(newRole: Role) =>
                        handleUpdateRole(user.id, newRole)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                        <SelectItem value="ADMIN">Administrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div className="space-x-2">
          <Button
            className="text-white"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            className="text-white"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this user?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. Please type &apos;DELETE&apos; to
              confirm.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onConfirmDelete)}>
            <Input
              {...register('confirmText')}
              placeholder="Type DELETE to confirm"
            />
            {errors.confirmText && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmText.message}
              </p>
            )}
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Delete User
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
