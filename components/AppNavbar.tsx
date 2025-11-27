"use client";

import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarProps,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
import ThemeChanger from "./ThemeChanger";
import AppIcon from "./AppIcon";
import { useAuthContext } from "@/contexts/AuthContext";

const menuItems = ["Features", "Customers", "About Us", "Intergrations"];

const AppNavbar = (props: NavbarProps) => {
  const [isActive, setIsActive] = React.useState("Features");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { isAuthenticated, profile, logout } = useAuthContext();

  return (
    <Navbar
      {...props}
      classNames={{
        wrapper: "w-full justify-center",
        item: "hidden md:flex",
        content: "gap-8",
      }}
      maxWidth="xl"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <div className="bg-background text-foreground rounded-full">
            <AppIcon size={50} />
          </div>
          <span className="ml-2 font-medium">ACME</span>
        </NavbarBrand>
        {menuItems.map((item) => (
          <NavbarItem
            key={item}
            isActive={isActive === item}
            onClick={() => setIsActive(item)}
          >
            <Link
              aria-current={isActive === item ? "page" : undefined}
              className="text-foreground"
              href="#"
              size="md"
            >
              {item}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Content */}
      <NavbarContent className="hidden md:flex" justify="end">
        <NavbarItem className="ml-2 flex! items-center gap-2">
          <ThemeChanger />
          {isAuthenticated && profile ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={profile.fullName?.[0] || "U"}
                  size="sm"
                  src={profile.avatar}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{profile.email}</p>
                </DropdownItem>

                <DropdownSection title="Manage Account">
                  <DropdownItem key="profiles" href="/me">
                    Profiles
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Manage Garage">
                  <DropdownItem key="garage" href="/me/garage">
                    Garage
                  </DropdownItem>
                  <DropdownItem key="listings" href="/me/listings">
                    Listings
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Manage Transactions">
                  <DropdownItem key="transactions" href="/me/transaction">
                    Transactions
                  </DropdownItem>
                  <DropdownItem key="co-ownerships" href="/me/co-ownerships">
                    Co-Ownerships
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection title="Settings">
                  <DropdownItem key="settings" href="/me/settings">
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={() => logout()}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <Button
                as={Link}
                href="/sign-in"
                className="text-md text-foreground"
                radius="full"
                variant="light"
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/sign-up"
                className="bg-foreground text-md text-background font-medium"
                color="secondary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                radius="full"
                variant="flat"
              >
                Get Started
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="bg-default-200/50 shadow-medium dark:bg-default-100/50 top-[calc(var(--navbar-height)-1px)] max-h-fit pt-6 pb-6 backdrop-blur-md backdrop-saturate-150">
        {isAuthenticated && profile ? (
          <NavbarMenuItem className="mb-4">
            <div className="flex items-center gap-2 p-2 border border-default-200 rounded-lg">
              <Avatar src={profile.avatar} name={profile.fullName} />
              <div className="flex flex-col">
                <span className="font-bold">{profile.fullName}</span>
                <span className="text-tiny text-default-500">
                  {profile.email}
                </span>
              </div>
            </div>
            <Button
              fullWidth
              color="danger"
              variant="flat"
              className="mt-2"
              onPress={() => logout()}
            >
              Log Out
            </Button>
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem>
              <Button fullWidth as={Link} href="/sign-in" variant="faded">
                Sign In
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem className="mb-4">
              <Button
                fullWidth
                as={Link}
                className="bg-foreground text-background"
                href="/sign-up"
              >
                Get Started
              </Button>
            </NavbarMenuItem>
          </>
        )}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="text-default-500 mb-2 w-full" href="#" size="md">
              {item}
            </Link>
            {index < menuItems.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default AppNavbar;
