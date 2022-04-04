import { Navigate } from "react-router-dom";
import { appTokenHolder } from "../token";

export function RequireAuth(props: { children: React.ReactElement }) {
    /**
     * For simplicity I just check that auth token is set, without validating it,
     * but, i made an endpoint in the server to validate the given token... (/auth/check/)
     */
    return appTokenHolder.getToken() ? (
        props.children
    ) : (
        <Navigate to="/login" replace={true} />
    );
}
