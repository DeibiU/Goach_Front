import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { LinkCard } from '../components/link-card';
import { Input } from '../components/ui/input';
import { Separator } from '../components/ui/separator';
import { User, UserSpec } from '../interfaces/types';

// import { useCameraPermissions} from "expo-camera";
import { Link } from 'expo-router';
import { Button } from '../components/ui/button';

const [form, setForm] = React.useState<UserSpec>({
    password: '',
    privateCode: '',
    name: '',
    role: '',
    email: '',
    active: true,
    height: '',
    weight: ''
});

// const [permission, requestPermission] = useCameraPermissions();
// const isPermissionGranted = Boolean(permission?.granted);

const setField =
  <K extends keyof User>(key: K) =>
  (value: User[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

const userLink = () => {
  const onSubmit = async () => {
    console.log('Nigger');
  };
  const user = React.useState<User>();
  return (
    <View className="flex-1 justify-center bg-black px-10 pt-20 gap-9">
      <Text className="text-7xl font-bold text-blue-500">Is your coach on Goach?</Text>
      <LinkCard />
      <View className="items-left">
        <Text className="items-left text-4xl font-semibold text-white">Coach's data</Text>
      </View>
      <View className="flex-row">
        {/* <Pressable onPress={requestPermission}>
          <Text>Request Permissions</Text>
        </Pressable> */}
        <Link href={'/scanner'} asChild>
          {/* <Pressable disabled={!isPermissionGranted}>
            <Text style={[
              { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >Scan Code              
            </Text>
          </Pressable> */}
        </Link>
        <View className="flex-column items-center">
          <Separator orientation="vertical" className="h-[4rem]" />
          <Text className="py-4 text-sm text-muted-foreground">or</Text>
          <Separator orientation="vertical" className="h-[4rem]" />
        </View>
        <View className="gap-8 p-10">
          <Input
            id="tEmail"
            placeholder="Trainee's Email"
            keyboardType="default"
            autoCapitalize="words"
            value={form.email}
            onChangeText={setField('name')}
            returnKeyType="next"
            submitBehavior="submit"
          />
          <Button className="w-full" onPress={onSubmit}>
            <Text>Link Now!</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default userLink;
