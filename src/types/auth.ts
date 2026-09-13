
export interface login {
     email: string;
     password: string;
}

export interface User {
     id: string;
     name: string;
     email: string;
     role: string;
     avatar: string | null;
}

export interface LoginResponse {
     user: User;
}

export interface AuthContextType {
     user: User | null;
     loading: boolean;
     isAuthenticated: boolean;
     login: (user: User) => void;
     logout: () => Promise<void>;
}

