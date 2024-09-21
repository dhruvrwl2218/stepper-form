
import { redirect } from 'next/navigation';
const page = () => {
    redirect('/auth/register');
    return null;
    
}

export default page
