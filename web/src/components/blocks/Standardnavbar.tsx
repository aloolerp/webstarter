import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { ModeToggle } from "@/utils/ModeToggle";
import { useNavigate } from "react-router-dom";


interface StandardNavbarProps {
  appLogo?: string;
  appName?: string;
  groupedLinks: { [key: string]: { parent: any; children: any[] } };
}

const NavLink= ({ href, children, className }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(href)}
      className={`cursor-pointer text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {children}
    </div>
  );
};

const StandardNavbar: React.FC<StandardNavbarProps> = ({ appLogo, appName, groupedLinks }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-accent shadow-sm">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        <NavLink href="/" className="flex items-center space-x-2">
          {appLogo && <img src={appLogo} alt="App Logo" className="h-12" /> || ""}
          <p className="font-semibold">{appName || ""}</p>
        </NavLink>

        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {Object.keys(groupedLinks).map((parentLabel) => {
                const { parent, children } = groupedLinks[parentLabel];
                return (
                  <NavigationMenuItem key={parent.label}>
                    {children.length === 0 ? (
                      <NavigationMenuLink>
                        <Button variant="ghost">
                          <NavLink href={parent.url || "#"}>{parent.label}</NavLink>
                        </Button>
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger className="font-medium text-sm">
                          {parent.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="!w-[450px] p-4">
                          <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                            <div className="flex flex-col h-full justify-between">
                              <div className="flex flex-col">
                                <p className="text-base">{parent.label}</p>
                                <p className="text-muted-foreground text-sm">
                                  {parent.description || ""}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col text-sm h-full justify-end">
                              {children.map((child: any) => (
                                <NavLink
                                  href={child.url}
                                  key={child.label}
                                  className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                                >
                                  <span>{child.label}</span>
                                  <MoveRight className="w-4 h-4 text-muted-foreground" />
                                </NavLink>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex justify-end w-full gap-4">
          <div className="border-r hidden md:inline"></div>
          <Button variant="outline">Sign in</Button>
          <Button>Get started</Button>
          <ModeToggle />
        </div>

        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
              {Object.keys(groupedLinks).map((parentLabel) => {
                const { parent, children } = groupedLinks[parentLabel];
                return (
                  <div key={parent.label}>
                    <NavLink href={parent.url || "#"} className="flex justify-between items-center">
                      <span className="text-lg">{parent.label}</span>
                      <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                    </NavLink>

                    {children.map((child: any) => (
                      <NavLink
                        key={child.label}
                        href={child.url}
                        className="flex justify-between items-center"
                      >
                        <span className="text-muted-foreground">{child.label}</span>
                        <MoveRight className="w-4 h-4 stroke-1" />
                      </NavLink>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StandardNavbar;