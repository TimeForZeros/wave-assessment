import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router';
import UserForm from '../components/forms/add-user-form';

const AddUser = () => {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    navigate('/')
  }
  return (
    <div className='w-screen h-screen flex justify-around'>
      <Card className='md:min-w-[32rem] mx-auto my-auto'>
        <CardHeader>
          <CardTitle>Add User</CardTitle>
        </CardHeader>
        <CardContent>
          <UserForm handleSubmission={handleFormSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
