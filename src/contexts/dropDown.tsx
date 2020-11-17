import React, { useRef } from "react";
import { StyleSheet } from 'react-native';
import DropdownAlert from "react-native-dropdownalert";

const DropDownContext = React.createContext({} as any);

export const DropDownComponentProvider: React.FC = ({ children }) => {
  let ref = useRef(null);

  return (
    <DropDownContext.Provider value={{ ref }}>
      {children}
      <DropdownAlert
        defaultContainer={styles.dropDownAlerContainer}
        ref={ref}
        updateStatusBar={false}
      />
    </DropDownContext.Provider>
  );
};

const styles = StyleSheet.create({
  dropDownAlerContainer: {
    padding: 15,
    margin: 20,
    borderRadius: 15,
  },
})

export const useDropDown = () => React.useContext(DropDownContext);
