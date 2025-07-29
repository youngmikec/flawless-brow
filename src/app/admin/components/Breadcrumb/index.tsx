"use client";
import Link from "next/link";
import { FC } from "react";

interface BreadcrumbProps {
    navigation?: { name: string; href: string }[];
    currentPage?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ navigation, currentPage }) => {
  return (
    <nav className="flex items-center space-x-2 text-gray-600">
        {
            navigation?.map((item, index) => (
                (index === navigation.length - 1) ? 
                    (
                        <Link 
                            key={index}
                            href={item.href}
                            className={`text-sm font-semibold text-primary font-inter`}
                        >
                            {item.name }
                        </Link>
                    ) : (
                        <div key={index} className="flex items-center space-x-2">
                            <Link 
                                href={item.href}
                                className={`text-sm text-gray font-inter`}
                            >
                                {item.name }
                            </Link>
                            <span className="text-gray font-inter">{">"}</span>
                        </div>
                    )
            ))
        }
    </nav>
  );
}
export default Breadcrumb;