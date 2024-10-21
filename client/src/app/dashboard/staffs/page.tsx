"use client";

import React, {useCallback, useEffect} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalContent,
} from "@nextui-org/react";
import {EditIcon, PlusIcon, TrashIcon} from "lucide-react";
import {deleteStaff, getStaffs} from "@/api/dashboard/staffAPI";
import {staff} from "@/types/dashboard";
import {useDashboardStore} from "@/store/dashboard-store";
import StaffForm from "@/app/dashboard/staffs/staff-form";
import toast from "react-hot-toast";

const columns = [
    {name: "NAME", uid: "name"},
    {name: "PHONE", uid: "phone"},
    {name: "ADDRESS", uid: "address"},
    {name: "STATUS", uid: "status"},
    {name: "ACTIONS", uid: "actions"},
];

export default function Page() {
    const [search, setSearch] = React.useState("");
    const [filteredStaffs, setFilteredStaffs] = React.useState<staff[]>([]);
    const {staffs, addStaffs} = useDashboardStore((state) => state);
    const [open, setOpen] = React.useState<boolean>(false);
    const [updateStaff, setUpdateStaff] = React.useState<staff | null>(null);

    const handleUpdate = (staff: staff) => {
        console.log("Updating staff:", staff);
        setUpdateStaff(staff);
        setOpen(true);
    };

    const handleDelete = useCallback(
        async (staff: staff) => {
            console.log("Delete user");
            console.log(staff);
            if (!staff) return;

            // Delete staff
            const res = await deleteStaff(staff.key);
            if (res?.success) {
                const latestStaffs = useDashboardStore.getState().staffs;
                const updatedStaffs = latestStaffs.filter((p) => {
                    return p && p.key !== staff.key;
                });
                addStaffs([...updatedStaffs]);
                toast.success("Staff deleted successfully");
            }
        },
        [addStaffs]
    );

    const renderCell = React.useCallback(
        (staff: staff, columnKey: React.Key) => {
            const cellValue = staff[columnKey as keyof staff];

            switch (columnKey) {
                case "name":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{cellValue}</p>
                        </div>
                    );
                case "phone":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{cellValue}</p>
                        </div>
                    );
                case "address":
                    return (
                        <div className="flex flex-col">
                            <p className="text-bold text-sm capitalize">{cellValue}</p>
                        </div>
                    );
                case "actions":
                    return (
                        <div className="relative flex justify-center items-center gap-2">
                            <Tooltip content="Edit user">
                <span
                    onClick={() => handleUpdate(staff)}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon className="size-5 text-warning-500"/>
                </span>
                            </Tooltip>
                            <Tooltip
                                content="Delete user"
                                classNames={{
                                    content: "bg-danger-500 text-white",
                                }}
                            >
                <span
                    onClick={() => handleDelete(staff)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <TrashIcon className="size-5"/>
                </span>
                            </Tooltip>
                        </div>
                    );
                default:
                    return cellValue;
            }
        },
        [handleDelete]
    );

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const res = await getStaffs();
                if (res?.success) {
                    console.log("Staffs fetched successfully");
                    addStaffs(res?.data);
                } else {
                    Error("Failed to fetch staffs");
                }
            } catch (error: any) {
                console.error(error.message);
                toast.error("Error fetching staffs");
            }
        };

        fetchStaffs();
    }, [addStaffs]);

    useEffect(() => {
        console.log("Staffs:", staffs);
        setFilteredStaffs(staffs);
    }, [staffs]);

    useEffect(() => {
        if (!search) {
            setFilteredStaffs(staffs);
            return;
        }

        const searchValue = search.toLowerCase();
        const filtered = staffs.filter((user) =>
            user.name.toLowerCase().includes(searchValue) ||
            user.phone.toLowerCase().includes(searchValue) ||
            user.address.toLowerCase().includes(searchValue)
        );

        setFilteredStaffs(filtered);
    }, [search, staffs]);

    return (
        <>
            <Modal className="p-5" size="lg" isOpen={open} onOpenChange={setOpen}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader>{updateStaff ? "Update Staff" : "Add Staff"}</ModalHeader>
                            <ModalBody>
                                <StaffForm staff={updateStaff} onClose={() => setOpen(false)}/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <h1 className="text-3xl font-bold mb-8">Staffs</h1>
            <div className="flex justify-between gap-4">
                <Input
                    isClearable
                    type="search"
                    variant="flat"
                    placeholder="Search staffs by name, phone, etc."
                    defaultValue=""
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => console.log("input cleared")}
                    className="max-w-xs mb-4"
                />
                <Button
                    onClick={() => {
                        setUpdateStaff(null);
                        setOpen(true);
                    }}
                    startContent={<PlusIcon/>}
                    className="bg-secondary-600 text-secondary-100"
                    variant="solid"
                >
                    Add Staff
                </Button>
            </div>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid}>{column.name}</TableColumn>
                    )}
                </TableHeader>
                <TableBody items={filteredStaffs}>
                    {(item: staff) => (
                        <TableRow key={item.id}>
                            {(columnKey) => (
                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
