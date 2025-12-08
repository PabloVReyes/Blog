import { deleteCarouselController, getAllCarouselContoller, getAllCarouselCountContoller, getCarouselController, postCarouselController, putCarouselController } from "@/controllers/carousel.controller";
import { upload } from "@/utils/storage";
import { Router } from "express";

const router: Router = Router()

router.get("/", getCarouselController)
router.get("/all", getAllCarouselContoller)
router.get("/all/count", getAllCarouselCountContoller)
router.post("/", upload.single("file"), postCarouselController)
router.put("/:id", upload.single("file"), putCarouselController)
router.delete("/:id", deleteCarouselController)

export default router;