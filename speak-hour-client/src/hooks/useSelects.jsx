import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiossSecure';
const useSelects = () => {
    const { user, loading } = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    // const token = localStorage.getItem('access-token');
    const { refetch, data: select = [] } = useQuery({
        queryKey: ['selects', user?.email],

        enabled: !loading,
        // queryFn: async () => {
        //     const res = await fetch(`https://speak-hour-server.vercel.app/selects?email=${user?.email}`, {
        //         headers: {
        //             authorization: `bearer ${token}`

        //         }
        //     })
        //     return res.json();
        // },

        queryFn: async () => {
            const res = await axiosSecure(`/selects?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })

    return [select, refetch]

}
export default useSelects;