import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Tab = () => {
  return (
    <div>
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
          <TabsTrigger value="Ingredient recognition">
            Ingredient recognition
          </TabsTrigger>
          <TabsTrigger value="Image creator">Image creator</TabsTrigger>
        </TabsList>
        <TabsContent value="Image analysis">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="Ingredient recognition">
          Change your password here.
        </TabsContent>
        <TabsContent value="Image creator">Img creating</TabsContent>
      </Tabs>
    </div>
  );
};
