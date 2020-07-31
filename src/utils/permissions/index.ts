import { getManager, getRepository } from "typeorm";

import { MethodEnum, ApiRouteEnum, Permission } from "../../entity/Permission";
import { Role } from "~/entity";
import { RoleEnum } from "~/entity/Role";

export const populatePermission = async () => {
  const roleRepo = getRepository(Role);

  let theAnon = await roleRepo.create({
    role: RoleEnum.ANON,
  });
  let theRider = await roleRepo.create({
    role: RoleEnum.RIDER,
  });
  let thePremium = await roleRepo.create({
    role: RoleEnum.PREMIUM_RIDER,
  });
  let theAdmin = await roleRepo.create({
    role: RoleEnum.ADMIN,
  });

  getManager().save(theAnon);
  getManager().save(thePremium);
  getManager().save(theRider);
  getManager().save(theAdmin);

  const permissionRepo = getRepository(Permission);

  let p1 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.AUTH_LOGIN,
    requestMethod: MethodEnum.POST,
  });

  let p2 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BIKE,
    requestMethod: MethodEnum.GET,
  });

  let p3 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BIKE,
    requestMethod: MethodEnum.POST,
  });

  let p4 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BIKE,
    requestMethod: MethodEnum.PATCH,
  });

  let p5 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BIKE,
    requestMethod: MethodEnum.DELETE,
  });

  let p6 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BIKE_DETAIL,
    requestMethod: MethodEnum.GET,
  });

  let p7 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BRAND,
    requestMethod: MethodEnum.GET,
  });

  let p8 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BRAND,
    requestMethod: MethodEnum.POST,
  });

  let p9 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BRAND,
    requestMethod: MethodEnum.DELETE,
  });

  let p10 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BRAND,
    requestMethod: MethodEnum.PATCH,
  });

  let p11 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.BRAND_DETAIL,
    requestMethod: MethodEnum.GET,
  });

  let p12 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.CONTACT,
    requestMethod: MethodEnum.GET,
  });

  let p13 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.CONTACT,
    requestMethod: MethodEnum.POST,
  });

  let p14 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.CONTACT,
    requestMethod: MethodEnum.PATCH,
  });

  let p15 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.CONTACT,
    requestMethod: MethodEnum.DELETE,
  });

  let p16 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.CONTACT_DETAIL,
    requestMethod: MethodEnum.GET,
  });

  let p17 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.PACK,
    requestMethod: MethodEnum.GET,
  });

  let p18 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.PACK,
    requestMethod: MethodEnum.POST,
  });

  let p19 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.PACK,
    requestMethod: MethodEnum.PATCH,
  });

  let p20 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.PACK,
    requestMethod: MethodEnum.DELETE,
  });

  let p21 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.PACK_DETAIL,
    requestMethod: MethodEnum.GET,
  });

  let p22 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.RIDER,
    requestMethod: MethodEnum.GET,
  });

  let p23 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.RIDER,
    requestMethod: MethodEnum.POST,
  });

  let p24 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.RIDER,
    requestMethod: MethodEnum.PATCH,
  });

  let p25 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.RIDER,
    requestMethod: MethodEnum.DELETE,
  });

  let p26 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.RIDER_DETAIL,
    requestMethod: MethodEnum.GET,
  });

  let p27 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.ROUTE,
    requestMethod: MethodEnum.GET,
  });
  let p28 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.ROUTE,
    requestMethod: MethodEnum.POST,
  });
  let p29 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.ROUTE,
    requestMethod: MethodEnum.PATCH,
  });
  let p30 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.ROUTE,
    requestMethod: MethodEnum.DELETE,
  });
  let p31 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.ROUTE_DETAIL,
    requestMethod: MethodEnum.GET,
  });

  let p32 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.MY_PACKS,
    requestMethod: MethodEnum.GET,
  });
  let p33 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.MY_PACKS,
    requestMethod: MethodEnum.PATCH,
  });
  let p34 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.MY_PACKS,
    requestMethod: MethodEnum.DELETE,
  });
  let p35 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.MY_ROUTES,
    requestMethod: MethodEnum.GET,
  });
  let p36 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.MY_ROUTES,
    requestMethod: MethodEnum.PATCH,
  });
  let p37 = await permissionRepo.create({
    apiRoute: ApiRouteEnum.MY_ROUTES,
    requestMethod: MethodEnum.DELETE,
  });

  await getManager().save(p1);
  await getManager().save(p2);
  await getManager().save(p3);
  await getManager().save(p4);
  await getManager().save(p5);
  await getManager().save(p6);
  await getManager().save(p7);
  await getManager().save(p8);
  await getManager().save(p9);
  await getManager().save(p10);
  await getManager().save(p11);
  await getManager().save(p12);
  await getManager().save(p13);
  await getManager().save(p14);
  await getManager().save(p15);
  await getManager().save(p16);
  await getManager().save(p17);
  await getManager().save(p18);
  await getManager().save(p19);
  await getManager().save(p20);
  await getManager().save(p21);
  await getManager().save(p22);
  await getManager().save(p23);
  await getManager().save(p24);
  await getManager().save(p25);
  await getManager().save(p26);
  await getManager().save(p27);
  await getManager().save(p28);
  await getManager().save(p29);
  await getManager().save(p30);
  await getManager().save(p31);
  await getManager().save(p32);
  await getManager().save(p33);
  await getManager().save(p34);
  await getManager().save(p35);
  await getManager().save(p36);
  await getManager().save(p37);

  theAnon.permissions = [
    p1,
    p2,
    p6,
    p7,
    p11,
    p12,
    p13,
    p14,
    p16,
    p17,
    p21,
    p22,
    p26,
    p23,
    p27,
    p31,
  ];

  theRider.permissions = [
    p1,
    p2,
    p3,
    p4,
    // p5,
    p6,
    p7,
    p8,
    // p9,
    p10,
    p11,
    p12,
    p13,
    p14,
    // p15,
    p16,
    p17,
    p18,
    p19,
    // p20,
    p21,
    p22,
    p23,
    p24,
    // p25,
    p26,
    p27,
    p28,
    p29,
    // p30,
    p31,
    p32,
    p33,
    p34,
    p35,
    p36,
    p37,
  ];
  theAdmin.permissions = [
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    p8,
    p9,
    p10,
    p11,
    p12,
    p13,
    p14,
    p15,
    p16,
    p17,
    p18,
    p19,
    p20,
    p21,
    p22,
    p23,
    p24,
    p25,
    p26,
    p27,
    p28,
    p29,
    p30,
    p31,
    p32,
    p33,
    p34,
    p37,
  ];

  await getManager().save(theAnon);
  await getManager().save(theRider);
  await getManager().save(theAdmin);
};
