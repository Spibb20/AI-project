import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImgAnalysis } from "./ImgAnalysis";
import { IngredientRecognition } from "./IngredientRecognition";
import { ImageCreator } from "./ImageCreator";

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
          <ImgAnalysis />
        </TabsContent>
        <TabsContent value="Ingredient recognition">
          <IngredientRecognition />
        </TabsContent>
        <TabsContent value="Image creator">
          <ImageCreator></ImageCreator>
        </TabsContent>
      </Tabs>
    </div>
  );
};
