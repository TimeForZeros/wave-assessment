import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '../components/ui/navigation-menu';

const NavBar = () => (
  <div className='w-full flex justify-between bg-slate-700 py-3 sticky'>
    <NavigationMenu viewport={false} className='mx-auto'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href='/' className='font-bold text-white'>Dashboard</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href='/add-user' className='font-bold text-white'>Add User</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
);
export default NavBar
