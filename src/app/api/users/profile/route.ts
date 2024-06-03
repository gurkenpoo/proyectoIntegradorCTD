import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { UsersService } from "@/app/services/Users.service";
import { initializeDataSource } from "@/app/DataSource";
import config from "../../auth/login/config.json";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "No authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded: any = verify(token, config.jwtSecret);
    const dataSource = await initializeDataSource();
    const usersService = new UsersService(dataSource);

    const user = await usersService.getUserById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Error fetching user profile" },
      { status: 500 }
    );
  }
}
