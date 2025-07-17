'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/unauthorized");
        } else {
            setChecked(true); 
        }
    }, [status, router]);

    return <>{children}</>;
}
