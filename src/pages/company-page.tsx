import { Layout } from '../components/layout/layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

export const CompanyPage = () => {
  const teamMembers = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Alex founded Upright with a mission to create a more secure online marketplace for everyone.',
    },
    {
      name: 'Samantha Lee',
      role: 'COO',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Sam oversees the day-to-day operations, ensuring that our platform remains secure and efficient.',
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Marcus leads our engineering team, developing cutting-edge solutions for our escrow platform.',
    },
    {
      name: 'Olivia Rodriguez',
      role: 'Head of Customer Success',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Olivia ensures that every customer has a smooth and successful experience with Upright.',
    },
  ];
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About Upright
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            We're on a mission to make online transactions safer and more secure for everyone.
          </p>
        </div>
        
        <div className="mb-16">
          <Card bordered>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Mission
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    At Upright, we believe that trust should be built into every online transaction. Our secure escrow platform protects both buyers and sellers by holding funds until all parties are satisfied with the transaction.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Founded in 2022, our team has decades of combined experience in fintech, security, and customer service. We're committed to providing the safest and most user-friendly escrow service available.
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800">
                  <img 
                    src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Team working together" 
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Team
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} bordered>
                <CardContent className="p-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 text-sm mb-2">
                      {member.role}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card bordered>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Security First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We prioritize the security of funds and personal information above all else, implementing industry-leading protection measures.
                </p>
              </CardContent>
            </Card>
            
            <Card bordered>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Transparency
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We believe in clear communication and full disclosure throughout the escrow process, so everyone knows exactly what's happening.
                </p>
              </CardContent>
            </Card>
            
            <Card bordered>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  User Experience
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We're committed to making our platform intuitive and easy to use, regardless of technical expertise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};