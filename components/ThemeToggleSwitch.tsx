"use client"

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggleSwitch = () => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isChecked) {
            htmlElement.classList.add("dark");
        } else {
            htmlElement.classList.remove("dark");
        }
    }, [isChecked]);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    }

    return (
        <div className="toggler m-0 flex items-center dark:text-neutral-300 text-neutral-900">
            {isChecked ? <Sun onClick={handleToggle} className="size-6" /> : <Moon onClick={handleToggle} className="size-6" />}
        </div>
    );
};

export default ThemeToggleSwitch;