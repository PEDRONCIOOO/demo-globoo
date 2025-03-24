"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon } from "@/components/icons";
import { LogoGloboo } from "@/public";

// Custom hook to detect scroll direction with threshold
const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(0);
  const threshold = 10; // Minimum scroll amount to trigger direction change

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only change direction if scrolled more than threshold
      if (Math.abs(currentScrollY - prevScrollY) > threshold) {
        if (currentScrollY > prevScrollY) {
          setScrollDirection("down");
        } else {
          setScrollDirection("up");
        }
        setPrevScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY, threshold]);

  return scrollDirection;
};

export const Navbar = () => {
  const scrollDirection = useScrollDirection();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (scrollDirection === "down") {
      controls.start("hidden");
      setIsVisible(false);
    } else {
      controls.start("visible");
      setIsVisible(true);
    }
  }, [scrollDirection, controls]);

  // Animation variants
  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hidden: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const logoVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hidden: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <motion.div
      animate={controls}
      initial="visible"
      variants={navbarVariants}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <HeroUINavbar
        maxWidth="xl"
        position="static"
        className="bg-background/80 backdrop-blur-md"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <motion.div variants={logoVariants}>
              <NextLink
                className="flex justify-start items-center gap-1"
                href="/"
              >
                <Image
                  alt="Globoo Logo"
                  height={32}
                  src={LogoGloboo}
                  width={120}
                />
              </NextLink>
            </motion.div>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item, index) => (
              <motion.div
                key={item.href}
                variants={itemVariants}
                custom={index}
              >
                <NavbarItem>
                  <NextLink
                    className={clsx(
                      linkStyles({ color: "foreground" }),
                      "data-[active=true]:text-primary data-[active=true]:font-medium"
                    )}
                    color="foreground"
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              </motion.div>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <motion.div variants={itemVariants}>
            <NavbarItem className="hidden sm:flex gap-2">
              <ThemeSwitch />
            </NavbarItem>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          </motion.div>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <motion.div variants={itemVariants}>
            <ThemeSwitch />
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavbarMenuToggle />
          </motion.div>
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </motion.div>
  );
};
