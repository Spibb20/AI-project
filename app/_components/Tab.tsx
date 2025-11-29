"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImgAnalysis } from "./ImgAnalysis";
import { IngredientRecognition } from "./IngredientRecognition";
import { ImageCreator } from "./ImageCreator";

export const Tab = () => {
  return (
    <div>
      <Tabs defaultValue="image-analysis" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="image-analysis">Image analysis</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="image-creator">Image creator</TabsTrigger>
        </TabsList>
        <TabsContent value="image-analysis">
          <ImgAnalysis />
        </TabsContent>
        <TabsContent value="ingredients">
          <IngredientRecognition />
        </TabsContent>
        <TabsContent value="image-creator">
          <ImageCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
};
