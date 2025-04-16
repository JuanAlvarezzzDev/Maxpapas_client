import { ButtonLogout, ButtonStore } from "../UI";
export default function Sidebar({ children }) {


  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <ButtonStore/>
        <ul className="h-full flex justify-center items-center ">
          <li>{children}</li>
        </ul>
        <div className="border-t flex p-3">
        <ButtonLogout/>
        </div>
      </nav>
    </aside>
  );
}
