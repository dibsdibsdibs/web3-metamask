import styles from '@/styles/gen.module.css'
import { Inter } from 'next/font/google'
import { getSession, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

function User({ user }) {
    // get user details and display sign out button when session is available
    return (
        <div className={`${styles.sesh} ${inter.className}`}>
            <h1>USER SESSION:</h1>
            
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <div className={styles.dispButton}>
                <button onClick={() => signOut({ redirect: "/signin" })}>Sign Out</button>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    // redirect if not authenticated
    if (!session) {
        return {
        redirect: {
            destination: "/",
            permanent: false,
        },
        };
    }

    return {
        props: { user: session.user },
    };
}

export default User;