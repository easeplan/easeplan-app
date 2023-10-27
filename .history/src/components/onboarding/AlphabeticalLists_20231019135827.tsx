import {
    Box,
    Divider,
    Typography,
    Button,
    Modal,
    Collapse,
  } from '@mui/material';

export function AlphabeticalList1() {
    const items = [
      `You affirm that you possess the requisite authority to consent to this Understanding.`,
      `You confirm that you are at least 18 years old.`,
      `You are bound (without qualification) and obligated to fully comply with all the terms contained in this Understanding until You voluntarily deactivate your account with Us or Your access to Our Platform is permanently revoked. It is important to note that any liabilities incurred prior to such deactivation or revocation will remain enforceable against You.`,
      `You are solely responsible for any responses or communications originating from Your account with Us.`,
      `You acknowledge that you will have access to certain personal information and data of the Service Seekers.`,
      `In this Understanding “Service Seeker” in this Understanding refers to third parties who use Our Platform to contact You and formally engage Your services.`,
    ];
  
    return (
      <>
        {items.map((item, index) => (
          <ListItem key={index} style={{ paddingLeft: 50 }}>
            <ListItemText
              primary={`(${String.fromCharCode(97 + index)}) ${item}`}
            />
          </ListItem>
        ))}
      </>
    );
  }
  
  export  function AlphabeticalList2() {
    const items = [
      `the price for a service shall be as stated in the relevant service offering;`,
      `the price for the service shall include applicable taxes and comply with applicable laws in force from time to time; and`,
      `the service must be of satisfactory quality, fit for any purpose specified in, and conform in all material respects to the service offering and Your service profile.`,
    ];
  
    return (
      <>
        {items.map((item, index) => (
          <ListItem key={index} style={{ paddingLeft: 50 }}>
            <ListItemText
              primary={`(${String.fromCharCode(97 + index)}) ${item}`}
            />
          </ListItem>
        ))}
      </>
    );
  }
  
  export function AlphabeticalList3() {
    const items = [
      `To  keep all personal information and data of the Service Seekers private and not - directly or indirectly - divulge, disclose, share or communicate any of such personal information and data to any third person or use such for personal gains, except as required in the course of performing the service in Your contract with the Service Seeker, or is so required by law to so disclose; and in any event that this happens, such personal information shall be divulged only with the prior notification and written consent of the Service Seeker.`,
      `To have a physical meeting with the Service Seeker at the choice (yet safe) location of the Service Seeker where the Service Seeker opts to have any physical sight with You before the performance of the service.`,
      `To not be emotional, insulting, verbally abusive, violent towards the Service Seekers.`,
      `That You stand in a fiduciary relationship towards the Us at all times and shall observe utmost good faith in any engagement with the Service Seekers. That also understand that You are not in any partnership relationship with Us.`,
      `To execute the services contracted for at all times within the agreed time and in such a manner as to preserve Our business and integrity.`,
    ];
  
    return (
      <>
        {items.map((item, index) => (
          <ListItem key={index} style={{ paddingLeft: 50 }}>
            <ListItemText
              primary={`(${String.fromCharCode(97 + index)}) ${item}`}
            />
          </ListItem>
        ))}
      </>
    );
  }
  
  export function AlphabeticalList4() {
    const items = [
      `You shall execute all the services to exacting standard in accordance to demand, agreement and in accordance with Your service profile.`,
      `You shall refund any and all sums received by You within 48 hours of such demand when Your service falls short of industry standards or the reasonable expectations of the Service Seeker.`,
      `All the personal information You provided are true and accurate and shall notify Us within 24 hours in the event that any of such information is no longer accurate or entirely true.`,
    ];
  
    return (
      <>
        {items.map((item, index) => (
          <ListItem key={index} style={{ paddingLeft: 50 }}>
            <ListItemText
              primary={`(${String.fromCharCode(97 + index)}) ${item}`}
            />
          </ListItem>
        ))}
      </>
    );
  }
  
  export  function AlphabeticalList5() {
    const items = [
      `temporarily suspend Your access to our Platform;`,
      `Permanently prohibit You from accessing our Platform;`,
      `Block computers using Your IP address from accessing our Platform;`,
      `Contact any or all of Your internet service providers and request that they block Your access to Our Platform;`,
      `Suspend or delete Your account on Our Platform; and/or`,
      `commence legal action against You, whether for breach of contract or otherwise.`,
    ];
  
    return (
      <>
        {items.map((item, index) => (
          <ListItem key={index} style={{ paddingLeft: 50 }}>
            <ListItemText
              primary={`(${String.fromCharCode(97 + index)}) ${item}`}
            />
          </ListItem>
        ))}
      </>
    );
  }
  
  function AlphabeticalList6() {
    const items = [
      `any costs, expenses and damages or fee paid to any third party/Service Seeker or government agency, to the sum equivalent to twice the fee expended or damage caused, as a result of Your breach of this Understanding.`,
      `any third party/Service Seeker claim or action instituted against Us, to the sum equivalent to twice the grand total of the claim or legal action found liable in, as a result of your breach of any provision of this Understanding.`,
      `any VAT liability or other tax liability that We may incur in relation to Your service offering through Our Platform where that liability arises out of Your inability to pay, withhold, or register to pay any VAT or other tax properly due in any territory or jurisdiction.`,
    ];
  
    return (
      <>
        {items.map((item, index) => (
          <ListItem key={index} style={{ paddingLeft: 50 }}>
            <ListItemText
              primary={`(${String.fromCharCode(97 + index)}) ${item}`}
            />
          </ListItem>
        ))}
      </>
    );
  }