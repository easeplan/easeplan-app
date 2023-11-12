import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Container } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import Link from 'next/link';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '85%',
    sm: '75%',
    md: '70%',
    lg: '70%',
    xl: '70%',
  },
  height: '90vh',
  overflow: 'scroll',
  bgcolor: '#fff',
  border: 'none',
  boxShadow: 24,
  borderRadius: '1rem',
};

const TermsAndConditionModal = ({ isOpen, isClose }: any) => {
  return (
    <Modal
      open={isOpen}
      onClose={isClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container maxWidth="sm">
        <Box sx={style}>
          <Box
            sx={{
              p: 2,
              backgroundColor: 'primary.main',
              borderTopRightRadius: '1rem',
              borderTopLeftRadius: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography color="secondary.main" fontWeight={600}>
              Privacy Policy
            </Typography>
            <Typography
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                color: 'secondary.light',
              }}
            >
              <CloseIcon onClick={isClose} />
            </Typography>
          </Box>
          <Box sx={{ border: 'solid 1px #ccc', p: 4 }}>
            <header>
              <h2 style={{ marginBottom: '1rem' }}>Privacy Policy</h2>
            </header>
            <main>
              <section id="1">
                <h4 style={{ marginBottom: '1rem' }}>OVERVIEW</h4>
                <p>
                  Easeplan Ltd. has meticulously formulated this Privacy Policy
                  to elucidate the manner in which we handle the collection,
                  retention, processing, sharing, and transfer of your Personal
                  Data when you access our Sites or utilize our Services. It is
                  essential to comprehend that this Privacy Policy exclusively
                  governs your Personal Data concerning your interaction with
                  our Sites and utilization of our Services, and it does not
                  encompass online websites or services that we do not own or
                  control, including those operated by other users of Easeplan.
                </p>
                <p>
                  The primary objective of this Privacy Policy is to furnish you
                  with comprehensive insights into our privacy practices and
                  facilitate your understanding of the choices you have
                  concerning your privacy while engaging with our Sites and
                  Services. It is imperative to note that the nature of our
                  Service offerings may differ depending on your geographical
                  location.
                </p>
                <p>
                  In order to enhance clarity and consistency, we have
                  established distinct definitions for certain terms used
                  throughout this Privacy Policy. You may refer to the
                  Definitions section to ascertain the meaning of any
                  capitalized term employed herein.
                </p>
                <p>
                  Please contact us via
                  <a href="mailto:easeplan.team@gmail.com">
                    easeplan.team@gmail.com
                  </a>
                  if you have questions about our privacy practices that are not
                  addressed in this Privacy Policy.
                </p>
              </section>
              <section id="2">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  DEFINITIONS
                </h4>
                <ul>
                  <li>
                    <strong>Account</strong> means an account on Easeplan
                    website.
                  </li>
                  <li>
                    <strong>Device Information</strong> means data that can be
                    automatically collected from any device used to access the
                    Sites or Services. Such information may include, but is not
                    limited to, your device type; your device`s network
                    connections; your device`s name; your device`s IP address;
                    information about your device`s web browser and the internet
                    connection being used to access the Site or Services;
                    Geolocation Information; and information about apps
                    downloaded to your device;
                  </li>
                  <li>
                    <strong>Geolocation Information</strong> means information
                    that identifies with reasonable specificity your location by
                    using, for instance, longitude and latitude coordinates
                    obtained through GPS, Wi-Fi, or cell site triangulation.
                    Some of our Services may ask you for permission to share
                    your current location. Some of the Sites and Services
                    require this information to provide a specific product or
                    online Service. If you do not agree to our collection of the
                    geolocation information, our Sites or Services may not
                    function properly when you try to use them.
                  </li>
                  <li>
                    <strong>Easeplan</strong> means Easeplan Ltd. and
                    affiliates. In this Privacy Statement, Easeplan is sometimes
                    referred to as “we,” “us,” or “our,” depending on the
                    context.
                  </li>
                  <li>
                    <strong>Personal Data</strong> means personal information
                    that can be associated with an identified or identifiable
                    person. “Personal Data” can include name, postal address
                    (including billing and shipping addresses), telephone
                    number, email address, payment card number, email other
                    account information, account number, date of birth, and
                    government-issued credentials (e.g., driver`s license
                    number, national ID, passport, Social Security number and
                    Taxpayer ID). Personal Data does not include information
                    that does not identify a specific User.
                  </li>
                  <li>
                    <strong>Process</strong> means any method or way that we
                    handle Personal Data or sets of Personal Data, whether or
                    not by automated means, such as collection, recording,
                    organization, structuring, storage, adaptation or
                    alteration, retrieval, and consultation, disclosure by
                    transmission, disseminating or otherwise making available,
                    alignment or combination, restriction, erasure or
                    destruction of Personal Data.
                  </li>
                  <li>
                    <strong>Services</strong> means any products, services,
                    content, features, technologies, or functions, and all
                    related websites, applications and services offered to you
                    by Easeplan.
                  </li>
                  <li>
                    <strong>Site</strong> means this website through which
                    Easeplan offers the Services and which has posted this
                    Privacy Policy.
                  </li>
                  <li>
                    <strong>Technical Usage Data</strong> means information we
                    collect from your phone, computer or other device that you
                    use to access the Sites or Services. Technical Usage Data
                    tells us how you use the Sites and Services, such as what
                    you have searched for and viewed on the Sites and the way
                    you use our Services, including your IP address, statistics
                    regarding how pages are loaded or viewed, the websites you
                    visited before coming to the Sites and other usage and
                    browsing information collected through Cookies.
                  </li>
                  <li>
                    <strong>User</strong> means an individual who uses the
                    Services or accesses this Site.
                  </li>
                </ul>
              </section>
              <section id="3">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  PERSONAL DATA WE COLLECT
                </h4>
                <p>
                  In the course of your visits to our Sites or utilization of
                  our Services, we may gather information pertaining to you,
                  which may encompass the following:
                </p>
                <div>
                  <h3>Registration and use information:</h3>
                  <p>
                    When you register to use our Services by creating an
                    Account, we will collect Personal Data as necessary to offer
                    and fulfill the Services you request. Depending on the
                    Services you choose, we may require you to provide us with
                    your name, state, picture, email address and identification
                    information to establish an Account. We may require you to
                    provide us with additional Personal Data as you use our
                    Services.
                  </p>
                </div>
                <div>
                  <h3>Transaction information:</h3>
                  <p>
                    When you use our Services or access our Site, for example,
                    to engage a planner/vendor, or to pay for services, we
                    collect information about the transaction, as well as other
                    information associated with the transaction such as the
                    amount paid for products or services and geolocation
                    information.
                  </p>
                  <ul>
                    <li>
                      <strong>Collaborator information:</strong> When you use
                      our Services or access our Site, we collect Personal Data
                      you provide us about the other collaborators associated
                      with the event/ transaction.
                    </li>
                    <li>
                      <strong>Send or request money:</strong> When you send or
                      request money through our site, we collect Personal Data
                      such as name, and financial account information about the
                      vendor. The extent of Personal Data required about a
                      collaborator/vendor may vary depending on the Services.
                    </li>
                    <li>
                      <strong>Information about your public profile: </strong>
                      When your Account profile is public, other users can find
                      your profile to engage you by searching for you by name,
                      username, email, on Easeplan and confirm it is you by
                      viewing your photo. You can make your Account profile
                      private anytime.
                    </li>
                    <li>
                      <strong>
                        Other information we collect related to your use of our
                        Site or Service:
                      </strong>
                      We may collect additional information from or about you
                      when you communicate with us, contact our customer support
                      teams or respond to a survey.
                    </li>
                  </ul>
                </div>
              </section>
              <section id="4">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  WE RETAIN PERSONAL DATA
                </h4>
                <p>
                  We retain Personal Data to fulfill our legal or regulatory
                  obligations and for our business purposes. We may retain
                  Personal Data for longer periods than required by law if it is
                  in our legitimate business interests and not prohibited by
                  law. If your Account is closed, we may take steps to mask
                  Personal Data and other information, but we reserve our
                  ability to retain and access the data for so long as required
                  to comply with applicable laws. We will continue to use and
                  disclose such Personal Data in accordance with this Privacy
                  Policy.
                </p>
              </section>
              <section id="5">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  WE PROCESS PERSONAL DATA
                </h4>
                <p>
                  We may Process your information for the following reasons:
                </p>
                <ul>
                  <li>
                    To operate the Site and provide the Services, including to:
                    <ul>
                      <li>
                        send or request money, add value (stars/likes) to an
                        account, or pay a bill;
                      </li>
                      <li>authenticate your access to an Account;</li>
                      <li>
                        communicate with you about your Account, the Sites, the
                        Services, or Easeplan; and
                      </li>
                      <li>
                        compare information for accuracy and verification
                        purposes.
                      </li>
                      <li>
                        keep your Account and financial information up to date.
                      </li>
                    </ul>
                  </li>
                  <li>
                    To manage our business needs, such as monitoring, analyzing,
                    and improving the Services and the Site&apos; performance
                    and functionality. For example, we analyze User behavior and
                    perform research about the way you use our Services.
                  </li>
                  <li>
                    To manage risk and protect the Site, the Services and you
                    from fraud by verifying your identity. Easeplan&apos;s risk
                    and fraud tools use Personal Data, Device Information,
                    Technical Usage Data and Geolocation Information from our
                    Site and websites that offer Easeplan Services to help
                    detect and prevent fraud and abuse of the Services.
                  </li>
                  <li>
                    To market to you about Easeplan products and Services. We
                    may also Process your Personal Data to uniquely tailor the
                    marketing content and certain Services or Site experiences
                    to better match your interests on Easeplan.
                  </li>
                  <li>
                    To provide you with location-specific options, functionality
                    or offers if you elect to share your Geolocation Information
                    through the Services. We will use this information to
                    enhance the security of the Sites and Services and provide
                    you with location-based Services, such as advertising,
                    search results, and other personalized content.
                  </li>
                  <li>
                    To comply with our obligations and to enforce the terms of
                    our Site and Services, including to comply with all
                    applicable laws and regulations.
                  </li>
                  <li>
                    To respond to your requests, for example to contact you
                    about a question you submitted to our customer service team.
                  </li>
                </ul>
              </section>
              <section id="6">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  SHARING PERSONAL DATA
                </h4>

                <p>
                  We may share your Personal Data or other information about you
                  with others in a variety of ways as described in this section
                  of the Privacy Policy.
                </p>
                <p>
                  We may share your Personal Data or other information for the
                  following reasons:
                </p>
                <ul>
                  <li>
                    <strong>
                      With other members of the Easeplan corporate family:
                    </strong>
                    We may share your Personal Data with members of the Easeplan
                    family of entities to, among other things, provide the
                    Services you have requested or authorized; to manage risk;
                    to help detect and prevent potentially illegal and
                    fraudulent acts and other violations of our policies and
                    agreements; and to help us manage the availability and
                    connectivity of Easeplan products, Services, and
                    communications.
                  </li>
                  <li>
                    <strong>
                      With other companies that provide services to us:
                    </strong>
                    We may share Personal Data with third-party service
                    providers that perform services and functions at our
                    direction and on our behalf. These third-party service
                    providers such as Paystack may, for example, provide you
                    with Services such as assisting in processing transactions.
                  </li>
                  <li>
                    <strong>
                      With the other parties to transactions when you use the
                      Services,
                    </strong>
                    such as other Users, Vendors, Collaborators and their
                    service providers: We may share information about you and
                    your account with the other parties involved in processing
                    your transactions. This includes other Users, vendors and
                    their service providers. The information includes:
                    <ul>
                      <li>
                        Personal Data and Account information necessary to
                        facilitate the transaction;
                      </li>
                      <li>
                        information to help other Users resolve disputes and
                        detect and prevent fraud; and
                      </li>
                      <li>
                        aggregated data and performance analytics to help
                        Vendors better understand Users and to help Vendors
                        enhance Users&apos; experiences.
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>
                      With other third parties for our business purposes or as
                      permitted or required by law:
                    </strong>
                    We may share information about you with other parties for
                    Easeplan business purposes or as permitted or required by
                    law, including:
                    <ul>
                      <li>
                        if we need to do so to comply with a law, legal process
                        or regulations;
                      </li>
                      <li>
                        law enforcement, regulators, government officials, or
                        other third parties (in Nigeria or elsewhere) in
                        relation to a subpoena, court order, or other legal
                        process or requirement under Nigerian law or regulation,
                        or the laws and regulations of other jurisdictions that
                        are applicable to Easeplan; when we need to do so to
                        comply with such law; or when we believe, in our sole
                        discretion, that the disclosure of Personal Data is
                        necessary or appropriate to prevent physical harm or
                        financial loss; or to report suspected illegal activity
                        or to investigate violations;
                      </li>
                      <li>to protect the vital interests of a person;</li>
                      <li>
                        to protect our property, Services and legal rights;
                      </li>
                      <li>
                        to facilitate a purchase or sale of all or part of
                        Easeplan`s business;
                      </li>
                      <li>
                        in connection with services rendered or for purchases
                        made using a Service;
                      </li>
                      <li>
                        to help assess and manage risk and prevent fraud against
                        us, our Users and fraud involving our Sites or use of
                        our Services, including fraud that occurs at or involves
                        our business partners, strategic ventures, or other
                        individuals and vendors;
                      </li>
                      <li>
                        to companies that we plan to merge with or be acquired
                        by; and
                      </li>
                      <li>
                        to support our audit, compliance, and corporate
                        governance functions.
                      </li>
                    </ul>
                  </li>
                  <li>
                    In addition, Easeplan may provide aggregated statistical
                    data to third-parties, including other businesses and
                    members of the public, about how, when, and why Users visit
                    our Sites and use our Services. This data will not
                    personally identify you or provide information about your
                    use of the Sites or Services. We do not share your Personal
                    Data with third parties for their marketing purposes without
                    your consent.
                  </li>
                </ul>
              </section>
              <section id="7">
                <h3 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  WE USE COOKIES
                </h3>
                <ol>
                  <li>
                    A cookie is a small data file that certain web sites write
                    to your hard drive when you visit them.
                  </li>
                  <li>
                    We use cookies on our website. The cookie is either sent
                    from the web server to the browser or generated in the
                    browser by a script. The web server can read this cookie
                    information directly from the server when the user visits
                    this page again or transfer the cookie information to the
                    server via a script of the website. Cookies do not cause any
                    damage to your device, do not contain viruses, Trojans or
                    other malware.
                  </li>
                  <li>
                    Information is stored in the cookie that is related to the
                    specific device used. This does not mean, however, that we
                    obtain direct knowledge of your identity.
                  </li>
                </ol>
              </section>
              <section id="8">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  YOUR PRIVACY CHOICES
                </h4>
                <p>
                  You have choices when it comes to the privacy practices and
                  communications described in this Privacy Policy:
                </p>
                <ol>
                  <li>
                    <h4>Choices Relating to the Personal Data We Collect</h4>
                    <ol>
                      <li>
                        Personal Data: You may decline to provide Personal Data
                        when it is requested by Easeplan, but certain Services
                        or all of the Services may be unavailable to you.
                      </li>
                      <li>
                        Object to Processing of your Personal Data: In
                        accordance with Section 36 of the Nigeria Data
                        Protection Act, you have the right to object to the
                        processing of your personal data by sending a request in
                        that regard via this email:<Link href="/">@.com.</Link>
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                      Choices Relating to Cookies
                    </h4>
                    <ol>
                      <li>
                        You may have options available to manage your cookies
                        preferences. For example, your browser or internet
                        device may allow you delete, disable, or block certain
                        cookies and other tracking technologies. You may choose
                        to enable these options, but doing so may prevent you
                        from using many of the core features and functions
                        available on a Service or Site.
                      </li>
                      <li>
                        You may have an option regarding the use of cookies and
                        other tracking technologies when you use a Service or
                        visit parts of a Site. For example, you may be asked if
                        you want the Service or Site to “remember” certain
                        things about you, and we will use cookies and other
                        tracking technologies to the extent that you permit
                        them.
                      </li>
                      <li>
                        You can learn more about our cookies by reading the
                        <Link href="/"> Cookies Policy </Link>.
                      </li>
                    </ol>
                  </li>
                  <li>
                    <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                      Choices Relating to Your Registration and Account
                      Information
                    </h4>
                    <p>
                      If you have an Account, you generally may review and edit
                      Personal Data by logging in and updating the information
                      directly or by contacting us. Contact us via
                      <a href="mailto:easeplan.team@gmail.com">
                        easeplan.team@gmail.com
                      </a>
                      if you have questions about your Account information or
                      other Personal Data.
                    </p>
                  </li>
                  <li>
                    <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                      Choices Relating to Communication
                    </h4>
                    <h5 style={{ marginBottom: '0.7rem' }}>
                      Notices, Alerts and Updates from Us:
                    </h5>
                    <ol>
                      <li>
                        <strong>Marketing:</strong> We may send you marketing
                        content about our Sites, Services, products, products we
                        jointly offer with other institutions, as well as the
                        products and services of unaffiliated third parties and
                        members of the Easeplan corporate family through various
                        communication channels, for example, email, pop-ups and
                        push notifications. You may opt out of these marketing
                        communications by following the instructions in the
                        communications you receive.
                      </li>
                      <li>
                        Informational and Other: We will send communications to
                        you that are required or necessary to send to Users of
                        our Services, notifications that contain important
                        information and other communications that you request
                        from us.
                      </li>
                    </ol>
                  </li>
                </ol>
              </section>
              <section id="9">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  YOUR RIGHTS
                </h4>
                <ol>
                  <li>
                    Subject to limitation set out in Data Protection Laws, you
                    have certain
                    <strong>
                      rights in relation to your personal data. You have the
                      right to request access to your data, erasure,
                      rectification and data portability.
                    </strong>
                    Please contact us via easeplan.
                    <a href="mailto:team@gmail.com">team@gmail.com</a>
                    if you want to exercise these rights.
                  </li>
                  <li>
                    You may have the right to review automated decision making.
                    You may also <strong>withdraw consent</strong>. Withdrawal
                    of your consent may affect our ability to provide services
                    to you. If you want to exercise any of your rights, contact
                    us via easeplan.
                    <a href="mailto:team@gmail.com">team@gmail.com</a>
                  </li>
                  <li>
                    If you wish to complete a request for access to all personal
                    data Easeplan holds about you, remember that you may be
                    required to prove your identity.
                  </li>
                  <li>
                    If you have an Account, you will generally be able to review
                    and edit Personal Data in the Account by accessing the
                    account and updating the information directly.
                  </li>
                  <li>
                    You have the
                    <strong>
                      right to lodge a complaint with the Nigeria Data
                      Protection Commission.
                    </strong>
                    If you believe that the processing of your personal data
                    violates data protection law, you also have the right to
                    complain to the data protection supervisory authority of
                    choice pursuant to
                    <strong>
                      Section 34 (1) (a) (vi) of the Nigeria Data Protection
                      Act.
                    </strong>
                  </li>
                </ol>
              </section>
              <section id="10">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  WE PROTECT YOUR PERSONAL DATA
                </h4>
                <ol>
                  <li>
                    We maintain technical, physical, and administrative security
                    measures designed to provide reasonable protection for your
                    Personal Data against loss, misuse, unauthorized access,
                    disclosure, and alteration. The security measures include
                    firewalls, data encryption, physical access controls to our
                    data centers, and information access authorization controls.
                  </li>
                  <li>
                    While we are dedicated to securing our systems and Services,
                    you are responsible for securing and maintaining the privacy
                    of your password(s) and Account/profile registration
                    information and verifying that the Personal Data we maintain
                    about you is accurate and current.
                  </li>
                </ol>
              </section>
              <section id="11">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  CHILDREN CANNOT USE OUR SERVICES
                </h4>
                <ol>
                  <li>
                    The Sites and Services are not directed to children under
                    the age of 18. We do not knowingly collect information,
                    including Personal Data, from children or other individuals
                    who are not legally able to use our Sites and Services. If
                    we obtain actual knowledge that we have collected Personal
                    Data from a child under the age of 18, we will promptly
                    delete it, unless we are legally obligated to retain such
                    data.
                  </li>
                  <li>
                    Contact us via
                    <a href="mailto:easeplan.team@gmail.com">
                      easeplan.team@gmail.com
                    </a>
                    if you believe that we have mistakenly or unintentionally
                    collected information from a child under the age of 18.
                  </li>
                </ol>
              </section>
              <section id="12">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  WHAT ELSE YOU SHOULD KNOW
                </h4>
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  Changes to This Privacy Statement:
                </h4>

                <ol>
                  <li>
                    We may revise this Privacy Statement from time to time to
                    reflect changes to our business, the Sites or Services, or
                    applicable laws. The revised Privacy Statement will be
                    effective as of the published effective date.
                  </li>
                  <li>
                    If the revised version includes a substantial change, we
                    will provide you with 30-day prior notice by posting notice
                    of the change on the “Policy Update” page of our website. We
                    also may notify Users of the change using email or other
                    means.
                  </li>
                </ol>
              </section>
              <section id="13">
                <h4 style={{ marginBottom: '0.7rem', marginTop: '1rem' }}>
                  CONTACT US
                </h4>
                <p>
                  You may contact us if you have general questions about our
                  Privacy Policy and practices or questions about your Account
                  information or Personal Data.
                </p>
                <p>
                  We want to make sure your questions go to the right place:
                </p>
                <ol>
                  <li>
                    Send a email here{' '}
                    <a href="mailto:easeplan.team@gmail.com">
                      <strong>easeplan.team@gmail.com</strong>
                    </a>{' '}
                    to contact us about your Easeplan account or transaction, or
                    a payment made to a vendor.
                  </li>

                  <li>
                    Our Data Protection Officer can be contacted via;
                    <address>
                      Rumuekini, Portharcourt Rivers State.
                    </address>{' '}
                    <a href="mailto:clinton@gmail.com">clinton@easeplan.io</a>{' '}
                    <p>
                      Please mark your letter “to the Data Protection Officer”.
                    </p>
                  </li>
                </ol>
              </section>
            </main>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default TermsAndConditionModal;
