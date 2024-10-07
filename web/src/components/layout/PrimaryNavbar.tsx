"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "@/utils/ModeToggle";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useFrappeGetDoc } from "frappe-react-sdk";
import {
  DropdownMenu,DropdownMenuContent,DropdownMenuTrigger,} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger} from "../ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import HeaderItems from "../dashboard/HeaderItems";
import { Zap } from "lucide-react";

const NavLink = ({ href, children, isActive, className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(href)}
      className={`transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"} ${className}`}
    >
      {children}
      {isActive && (
        <span className="block mt-1 h-[2px] bg-primary rounded"></span>
      )}
    </button>
  );
};

export function PrimaryNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, error } = useFrappeGetDoc("Web Settings", "Web Settings");

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  if (error) {
    return <div>Error loading navigation items.</div>;
  }

  const links = data?.top_bar_items || [];

  const groupedLinks = links.reduce((acc, item) => {
    if (!item.parent_label && item.label) {
      acc[item.label] = { parent: item, children: [] };
    } else if (item.parent_label) {
      if (!acc[item.parent_label]) {
        acc[item.parent_label] = { parent: { label: item.parent_label }, children: [] };
      }
      acc[item.parent_label].children.push(item);
    }
    return acc;
  }, {});

  const isActive = (url) => location.pathname === url;

  return (
    <header
      className={`sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
          <Zap className="w-8 h-8 text-primary" />
            {data?.app_logo && (
              <img src={data.app_logo} alt={data.app_name ||  ""} className="h-16 w-24 " />
            )}
            <span className="text-xl font-bold">{data?.app_name }</span>
          </div>
        </div>

        <nav className="hidden lg:flex lg:flex-1 justify-center items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {Object.keys(groupedLinks).map((key) => {
                const group = groupedLinks[key];
                if (group.children.length > 0) {
                  return (
                    <NavigationMenuItem key={key} className="mr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className="relative">
                            <NavigationMenuTrigger
                              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                            >
                              {group.parent.label}
                            </NavigationMenuTrigger>
                            {isActive(group.parent.url) && (
                              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded"></span>
                            )}
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="p-2">
                          <ul className="w-80">
                            {group.children.map((child, index) => (
                              <li key={index}>
                                <NavLink
                                  href={child.url}
                                  isActive={isActive(child.url)}
                                  className="block w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                                >
                                  {child.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuItem>
                  );
                } else {
                  return (
                    <NavigationMenuItem key={group.parent.label} className="px-3">
                      <NavLink
                        href={group.parent.url}
                        isActive={isActive(group.parent.url)}
                      >
                        {group.parent.label}
                      </NavLink>
                    </NavigationMenuItem>
                  );
                }
              })}
            </NavigationMenuList>
          </NavigationMenu>
         
        </nav>

        <div className=""><HeaderItems /></div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                {data?.app_logo && (
                  <img src={data.app_logo} alt={data.app_name || "Logo"} className="h-8 w-8" />
                )}
                <span className="text-xl font-bold">{data?.app_name }</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              {Object.keys(groupedLinks).map((key) => {
                const group = groupedLinks[key];
                if (group.children.length > 0) {
                  return (
                    <Accordion key={key} type="single" collapsible>
                      <AccordionItem value={group.parent.label}>
                        <AccordionTrigger className="py-2 font-semibold flex justify-between items-center">
                          {group.parent.label}
                        </AccordionTrigger>
                        <AccordionContent className="mt-2 flex flex-col gap-2">
                          {group.children.map((child, index) => (
                            <NavLink key={index} href={child.url} className="text-left">
                              {child.label}
                            </NavLink>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                } else {
                  return (
                    <NavLink key={group.parent.label} href={group.parent.url} className="py-2 font-semibold">
                      {group.parent.label}
                    </NavLink>
                  );
                }
              })}
            </div>
            
          </SheetContent>
        </Sheet>
        
       
      </div>
    </header>
  );
}

export default PrimaryNavbar;
