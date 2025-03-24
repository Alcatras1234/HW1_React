import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

export function LoginLogout() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [keys, setKeys] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogIn = async (login: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login,
          password: password,
        }),
      });
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.message}`);
      }


      setKeys([data.accessToken, data.refreshToken]);
      setError(null); // Сбрасываем ошибку, если вход успешен
    } catch (error) {
      console.error("Error during login:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  const handleLogOut = async () => {
    try {
      const accessToken = keys[0];
      console.log(accessToken);

      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      });


      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.message}`);
      }
      setKeys([]);


      console.log(data.message);
    } catch (error) {
      console.error("Error during login:", error);
      setError(error instanceof Error ? error.message : "Failed to log in");
    }
  }



  return (
    <>
      <div className="flex flex-col">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-amber-50" onClick={() => setIsDialogOpen(true)}>Log In</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log In</DialogTitle>
              <DialogDescription>
                Вход в систему
                Подсказка: логин - d@gmail.com, пароль - admin
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Login
                </Label>
                <Input
                  id="name"
                  type="email"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Password
                </Label>
                <Input
                  id="username"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => {
                handleLogIn(login, password);
                setIsDialogOpen(false);
              }}>
                Log In
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        <Button variant="outline" className="text-amber-50" onClick={() => handleLogOut()}>Log Out</Button>


        {keys.length > 0 && (
          <div>
            <h3>Keys:</h3>
            <ul>
              {keys.map((key, index) => (
                <li key={index}>{key}</li>
              ))}
            </ul>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}

