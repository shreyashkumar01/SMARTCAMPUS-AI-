import { FiActivity, FiZap, FiCheckCircle, FiShield } from "react-icons/fi";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";

const features = [
  {
    icon: <FiActivity className="w-8 h-8 text-blue-500" />,
    title: "Instant Bug Reporting",
    desc: "Report issues instantly and easily, making it simple for you to help us improve."
  },
  {
    icon: <FiZap className="w-8 h-8 text-green-500" />,
    title: "Seamless User Experience",
    desc: "Enjoy a smooth and intuitive interface designed to get your feedback quickly."
  },
  {
    icon: <FiCheckCircle className="w-8 h-8 text-indigo-500" />,
    title: "Resolved with Care",
    desc: "We review and address reported issues promptly to foster a better platform."
  },
  {
    icon: <FiShield className="w-8 h-8 text-purple-500" />,
    title: "Your Privacy Matters",
    desc: "Report concerns with confidence — your information is kept safe and private."
  }
];

const Features = () => (
  <section  id="features" className="blur-in">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 mt-30">Why Use Our App?</h2>
      <p className="text-center text-gray-600 mb-12">
        Discover the benefits of reporting issues through our platform.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f, idx) => (
          <Card key={idx} className="flex flex-row items-start">
            <div className="mr-4 mt-2">{f.icon}</div>
            <div>
              <CardHeader className="p-0 pb-1">
                <CardTitle className="text-xl font-semibold">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CardDescription className="text-gray-600">{f.desc}</CardDescription>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export { Features };
