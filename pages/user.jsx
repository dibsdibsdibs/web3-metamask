import styles from '@/styles/gen.module.css'
import { Inter } from 'next/font/google'
import { getSession, signOut } from "next-auth/react"
import { useBalance } from 'wagmi'

const inter = Inter({ subsets: ['latin'] })

function User({ user }) {

    // get balance
    const balance = useBalance({
        address: user.address,
    })

    // get user session and display sign out button when session is available
    return (
        <div className={`${styles.user} ${inter.className}`}>
            <h1>USER DETAILS</h1>
            <div>
                <div className={styles.details}>
                    <h3>ADDRESS</h3>
                    <p>{user.address}</p>  
                </div>
                <div className={styles.details}>
                    <h3>CURRENT BALANCE</h3>
                    <p>{balance.data.formatted}</p>
                </div>
            </div>
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