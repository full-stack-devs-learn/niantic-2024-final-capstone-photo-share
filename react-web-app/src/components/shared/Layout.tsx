import "./Layout.css"
import { ReactNode } from "react";
import Header from "./header/Header";

interface LayoutChildren{
    children: ReactNode
}

export default function Layout({children}: LayoutChildren)
{
    return (
        <>
            <Header />
            {children}
        </>
    )
}