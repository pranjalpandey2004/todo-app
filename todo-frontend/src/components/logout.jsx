export default function Logout() {
    localStorage.removeItem("token");
    window.location.reload();
    return null;
}