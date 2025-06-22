// 'use client'
import { HouesholdsProvider } from "@/hooks/useHouseholds";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useUser } from "@/hooks/useUser";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FormEvent, useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { HouseholdsList } from "./households-list";
import { AddHousehold } from "./household-add";
import { HouseholdsListInvitations } from "./households-list-invitations";

export default function HouseholdsPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-12 items-start w-full">
        <HouesholdsProvider>
          <div className="w-full flex flex-col items-start">
          <div className="w-full flex justify-between items-center">
            <h2 className="font-bold text-2xl">Households</h2>
            <AddHousehold />
          </div>
          <HouseholdsList />
          </div>
          <HouseholdsListInvitations />
        </HouesholdsProvider>
      </div>
    </div>
  );
}

