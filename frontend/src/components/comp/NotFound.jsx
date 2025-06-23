import { Ghost } from "lucide-react";

const NotFound = () => {

    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center bg-base-200 px-4">
            <div className="text-center space-y-6">
                <Ghost className="mx-auto w-20 h-20 text-primary" />
                <h1 className="text-5xl font-bold text-primary">404</h1>
                <p className="text-xl text-base-content">Oops! Page not found.</p>
            </div>
        </div>
    );
};

export default NotFound;