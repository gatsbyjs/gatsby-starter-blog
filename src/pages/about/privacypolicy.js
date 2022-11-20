import React from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Privacypolicy = () => {
  return (
    <Layout>
      <Seo title="PRIVACY POLICY" />
      <div className="mx-auto w-full max-w-4xl flex flex-col justify-center px-6 py-8 text-black dark:text-white">
        <h1 className="text-lg font-bold">PRIVACY POLICY</h1>
        <p className="py-2">
          At En Plein Air, accessible from www.enpleinair.co.uk, one of our main
          priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by En Plein Air and how we use it. If you have additional questions or
          require more information about our Privacy Policy, do not hesitate to
          contact us through email at <u>contact@enpleinair.com</u>.
        </p>
        <h1 className="mt-2 text-md font-bold">LOG FILES</h1>
        <p className="py-2">
          En Plein Air follows a standard procedure of using log files. These
          files log visitors when they visit websites. All hosting companies do
          this and a part of hosting services' analytics. The information
          collected by log files include internet protocol (IP) addresses,
          browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not
          linked to any information that is personally identifiable. The purpose
          of the information is for analyzing trends, administering the site,
          tracking users' movement on the website, and gathering demographic
          information.
        </p>
        <h1 className="mt-2 text-md font-bold">PRIVACY POLICIES</h1>
        <p className="py-2">
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on En Plein Air, which are sent
          directly to users' browser. They automatically receive your IP address
          when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit. Note that
          En Plein Air has no access to or control over these cookies that are
          used by third-party advertisers.
        </p>
        <h1 className="mt-2 text-md font-bold">THIRD PARTY PRIVACY POLICIES</h1>
        <p className="py-2">
          En Plein Air's Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options. You can choose to disable cookies
          through your individual browser options. To know more detailed
          information about cookie management with specific web browsers, it can
          be found at the browsers' respective websites.
        </p>
        <h1 className="mt-2 text-md font-bold">ONLINE PRIVACY POLICY ONLY</h1>
        <p className="py-2">
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in En Plein Air. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </p>
        <h1 className="mt-2 text-md font-bold">CONSENT</h1>
        <p className="py-2">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions.
        </p>
      </div>
    </Layout>
  );
};

export default Privacypolicy;
