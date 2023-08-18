
//ref pxt_modules\game\textDialogs.ts
namespace game {
    scene.setBackgroundImage(sprites.background.desert)
    // game.showLongText("test", DialogLayout.Full)
    // game.showImageDialog(sprites.background.autumn, DialogLayout.Full)
    scene.backgroundImage().fill(0)

    const MAX_FRAME_UNIT = 12;

    //show Image with scrolling
    export class ImageDialog extends BaseDialog {
        innerImage: Image
        innerImageHeader: Image
        innerImageFooter: Image
        offsetX = 0
        offsetY = 0

        constructor(width: number, height: number, frame?: Image, font?: image.Font, cursor?: Image) {
            super(width, height, frame, font, cursor);
        }

        public setImage(img: Image, imgHeader?: Image, imgFooter?: Image) {
            this.innerImage = img
            this.innerImageHeader = imgHeader
            this.innerImageFooter = imgFooter
        }

        public scroll(x: number, y: number) {
            this.offsetX -= x
            this.offsetY -= y
            let h = this.textAreaHeight()
            if (this.innerImageHeader) h -= this.innerImageHeader.height
            if (this.innerImageFooter) h -= this.innerImageFooter.height
            this.offsetX = Math.clamp(0, this.innerImage.width - this.textAreaWidth(), this.offsetX)
            this.offsetY = Math.clamp(0, this.innerImage.height - h, this.offsetY)
        }

        //override, origin area is too small for Image
        protected clearInterior() {
            this.image.fillRect(
                this.innerLeft + Math.min(this.unit, MAX_FRAME_UNIT),
                this.innerTop + Math.min(this.unit, MAX_FRAME_UNIT),
                this.textAreaWidth(),
                this.textAreaHeight(),
                this.frame.getPixel(this.frame.width >> 1, this.frame.height >> 1)
            )
        }

        drawTextCore() {
            if (this.unit > MAX_FRAME_UNIT) this.drawBorder();
            const left = this.innerLeft + Math.min(this.unit, MAX_FRAME_UNIT)
            let top = this.innerTop + Math.min(this.unit, MAX_FRAME_UNIT)
            const w = this.textAreaWidth()
            let h = this.textAreaHeight()

            if (this.innerImageFooter) {
                this.image.blit(
                    left,
                    top + h - this.innerImageFooter.height,
                    this.innerImageFooter.width,
                    this.innerImageFooter.height,
                    this.innerImageFooter,
                    0,
                    0,
                    this.innerImageFooter.width,
                    this.innerImageFooter.height,
                    true, false)
                h -= this.innerImageFooter.height
            }

            if (this.innerImageHeader) {
                this.image.blit(
                    left,
                    top,
                    this.innerImageHeader.width,
                    this.innerImageHeader.height,
                    this.innerImageHeader,
                    0,
                    0,
                    this.innerImageHeader.width,
                    this.innerImageHeader.height,
                    true, false)
                h -= this.innerImageHeader.height
            }

            // this.innerImage=sprites.background.cityscape
            this.image.blit(
                left,
                top + this.innerImageHeader.height,
                w,
                h,
                this.innerImage,
                this.offsetX + 0,
                this.offsetY + 0,
                w,
                h,
                true, false)
        }

        public setFrame(frame: Image) {
            this.frame = frame
            const width = this.image.width
            const height = this.image.height

            console.log(frame.width)
            this.unit = Math.floor(this.frame.width / 3);
            this.columns = Math.floor(width / this.unit);
            this.rows = Math.floor(height / this.unit);
            this.innerLeft = (width - (this.columns * this.unit)) >> 1;
            this.innerTop = (height - (this.rows * this.unit)) >> 1;

            this.drawBorder();
            this.clearInterior();

            // this.resize(this.image.width,this.image.height,frame)
        }
    }


    export function showImageDialog(layout: DialogLayout, img: Image, imgHeader?: Image, imgFooter?: Image) {
        controller._setUserEventsEnabled(false);
        game.pushScene();
        game.currentScene().flags |= scene.Flag.SeeThrough;

        let width: number;
        let height: number;
        let top: number;
        let left: number;

        switch (layout) {
            case DialogLayout.Bottom:
                width = screen.width - 4;
                height = Math.idiv(screen.height, 3) + 5;
                top = screen.height - height;
                left = screen.width - width >> 1;
                break;
            case DialogLayout.Top:
                width = screen.width - 4;
                height = Math.idiv(screen.height, 3) + 5;
                top = 0;
                left = screen.width - width >> 1;
                break;
            case DialogLayout.Left:
                width = Math.idiv(screen.width, 3) + 5;
                height = screen.height;
                top = 0;
                left = 0;
                break;
            case DialogLayout.Right:
                width = Math.idiv(screen.width, 3) + 5;
                height = screen.height;
                top = 0;
                left = screen.width - width;
                break;
            case DialogLayout.Center:
                width = Math.idiv(screen.width << 1, 3);
                height = Math.idiv(screen.width << 1, 3);
                top = (screen.height - height) >> 1;
                left = (screen.width - width) >> 1;
                break;
            case DialogLayout.Full:
                width = screen.width;
                height = screen.height;
                top = 0;
                left = 0;
                break;
        }

        const dialog = new ImageDialog(width, height);
        dialog.setImage(img, imgHeader, imgFooter)
        const s = sprites.create(dialog.image, -1);
        s.top = top;
        s.left = left;

        const frames = [
            sprites.dialog.bones,
            sprites.dialog.cityscape,
            sprites.dialog.desert,
            sprites.dialog.frogs,
            sprites.dialog.hugeLeaf,
            sprites.dialog.largeShell,
            sprites.dialog.largeStar,
            sprites.dialog.mediumStar,
            sprites.dialog.mediumShell,
            sprites.dialog.mediumLeaf0,
            sprites.dialog.mediumLeaf1,
            sprites.dialog.pineday,
            sprites.dialog.pinenight,
            sprites.dialog.smallIndustrial0,
            sprites.dialog.smallIndustrial1,
            sprites.dialog.smallBlue0,
            sprites.dialog.smallBlue1,
            sprites.dialog.smallDefault,
            sprites.dialog.smallSwirlyWhite,
            sprites.dialog.smallSwirlyPurple,
            sprites.dialog.smallDialogLeftThin,
            sprites.dialog.smallDialogLeftThick,
            sprites.dialog.smallDialogCenterThin,
            sprites.dialog.smallDialogcenterThick,
            sprites.dialog.starryclouds,
        ]

        let selectFrameId = 2


        let done = false;
        let pressed = true;
        let lpressed = true;
        let rpressed = true;
        let msKeyPressed = 0;
        game.onUpdate(() => {
            dialog.update();
            const currentState = controller.A.isPressed();
            if (currentState && !pressed) {
                pressed = true;
                scene.setBackgroundImage(null); // GC it
                game.popScene();
                done = true;
            }
            else if (pressed && !currentState) {
                pressed = false;
            }

            if (controller.down.isPressed()) {
                dialog.scroll(0, -1)
            }

            if (controller.up.isPressed()) {
                dialog.scroll(0, 1)
            }


            // const isLeft = controller.left.isPressed();
            // if (isLeft && !lpressed) {
            //     lpressed = true;
            //     selectFrameId = Math.clamp(0, frames.length - 1, selectFrameId - 1)
            //     info.setScore(selectFrameId)
            //     dialog.setFrame(frames[selectFrameId])
            // }
            // else if (lpressed && !isLeft) {
            //     lpressed = false;
            // }

            // const isRight = controller.right.isPressed();
            // if (isRight && !rpressed) {
            //     rpressed = true;
            //     selectFrameId = Math.clamp(0, frames.length - 1, selectFrameId + 1)
            //     info.setScore(selectFrameId)
            //     dialog.setFrame(frames[selectFrameId])
            // }
            // else if (rpressed && !isRight) {
            //     rpressed = false;
            // }

            if (controller.anyButton.isPressed())
                msKeyPressed = control.millis()
            if (msKeyPressed + 1000 < control.millis())
                dialog.scroll(0, -1)
        })

        pauseUntil(() => done);
        controller._setUserEventsEnabled(true);
    }


}