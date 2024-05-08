import { TextInput } from "react-native";

export const Inputetext = (props) => (
  <TextInput
    placeholder={props.placeholder}
    value={props.value}
    secureTextEntry={props.secureTextEntry}
    onChange={props.onChange}
    onChangeText={props.onChangeText}
    style={{ height: 45, width: '80%', backgroundColor: "#dde3ec", alignSelf: 'center', marginTop: 10, borderRadius: 5, paddingLeft: 10, color: 'black' }}
    placeholderTextColor={'black'}
    keyboardType={props.keyboardType}
  />
)