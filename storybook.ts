namespace SpriteKind {
    export const UI = SpriteKind.create()
}

namespace StoryBook {

    interface Event {
        t: number;
        color: number;
        createElement(): void;
    }

    interface EventProps {
        v: number;
        pos: number;
        after?: number;
        delay?: number;
        offset?: number;
        direction?: Direction;
        times?: number;
        element: { color: number, create: (mov: Movement) => void };
    }

    interface Level {
        level: number;
        description: string;
        storyBook: Event[];
    }

    class LevelBuilder {
        private gameBuilder: GameBuilder;
        private level: number;
        private description: string;
        private storyBook: Event[] = [];
        private ticks: number = 0;

        constructor(level: number, description: string, gameBuilder: GameBuilder) {
            this.level = level;
            this.description = description;
            this.gameBuilder = gameBuilder;
        }

        public static level(level: number, description: string, gameBuilder: GameBuilder): LevelBuilder {
            return new LevelBuilder(level, description, gameBuilder);
        }

        public wait(ticks: number): LevelBuilder {
            this.ticks += ticks;
            return this;
        }

        public with(propsArray: EventProps[]): LevelBuilder {
            propsArray.forEach((props: EventProps) => {
                if (!props.delay && props.delay !== 0) {
                    props.delay = 3;
                }
                if (!props.after) {
                    props.after = 0;
                }
                if (!props.offset && props.offset !== 0) {
                    props.offset = 10;
                }
                if (!props.direction && props.direction !== 0) {
                    props.direction = Direction.DOWN;
                }
                if (!props.times) {
                    props.times = 1;
                }

                this.ticks += props.after;

                for (let i = 0; i < props.times; i++) {
                    const pos = props.pos + i * props.offset;
                    const t = this.ticks + i * props.delay;
                    this.storyBook.push(
                        {
                            t,
                            color: props.element.color,
                            createElement: () => props.element.create({
                                direction: props.direction,
                                pos,
                                v: props.v
                            })
                        }
                    );
                }
            });

            return this;
        }

        public build(): GameBuilder {
            // Sort by ticks
            this.storyBook.sort((a, b) => {
                return a.t - b.t;
            });

            this.gameBuilder.addLevel({
                level: this.level,
                description: this.description,
                storyBook: this.storyBook
            });

            return this.gameBuilder;
        }
    }

    class GameBuilder {
        levels: Level[] = [];
        levelCounter = 0

        constructor() { }

        public nextLevel(description: string): LevelBuilder {
            this.levelCounter += 1
            return LevelBuilder.level(this.levelCounter, description, this);
        }

        public addLevel(level: Level) {
            this.levels.push(level);
        }
    }


    const gameBuilder = new GameBuilder()
    function setup(): Level[] {

        const halfWidth: number = scene.screenWidth() / 2;
        const halfHeight: number = scene.screenHeight() / 2;

        return gameBuilder
            /*
                .nextLevel("test level").with([
                    { element: Elements.cloud1, after: 1, v: 2, pos: 120 },
                    { element: Elements.cloud1, after: 10, v: 35, pos: 60 },
                    { element: Enemies.greenPlane, v: 3, pos: 10, direction: Direction.LEFT },
                    { element: Enemies.greenPlane, after: 10, v: 3, pos: 30, direction: Direction.RIGHT },
                ]).build()
                */
            .nextLevel("Air attack").with([
                { element: Elements.cloud1, after: 10, v: 30, pos: 120 },
                { element: Elements.cloud1, after: 10, v: 35, pos: 60 },
                { element: Enemies.greenPlane, v: 40, pos: 10, direction: Direction.LEFT },
                { element: Enemies.greenPlane, after: 10, v: 40, pos: 30, direction: Direction.RIGHT },

                { element: Elements.cloud2, v: 30, pos: 60 },
                { element: Elements.cloud1, v: 35, pos: 20 },
                { element: Elements.cloud1, after: 5, v: 25, pos: 120 },
                { element: Elements.island1, after: 10, times: 2, v: 10, pos: 10, offset: -50 },
                { element: Enemies.redPlane, after: 15, v: 60, pos: 70, direction: Direction.RIGHT },
                { element: Enemies.redPlane, v: 60, pos: 90, direction: Direction.LEFT },
                { element: Elements.cloud1, after: 20, v: 35, pos: 20 },
                { element: Elements.cloud1, after: 10, v: 25, pos: 60 },
                { element: Enemies.grayPlane, after: 10, v: 80, pos: 40, direction: Direction.LEFT },
                { element: Enemies.grayPlane, after: 10, v: 80, pos: 60, direction: Direction.RIGHT },
                { element: Elements.cloud1, v: 30, pos: 120 },
                { element: Elements.cloud2, after: 15, v: 30, pos: 40 },
                { element: Enemies.bigPlane, after: 5, v: 35, pos: 60 },
                { element: Elements.cloud1, times: 2, v: 20, pos: 100, offset: -60, delay: 10 },
                { element: Elements.cloud1, after: 10, times: 2, v: 17, pos: 10, offset: 50, delay: 16 },
                { element: Enemies.redPlane, after: 10, v: 60, pos: 85, direction: Direction.RIGHT },
                { element: Enemies.redPlane, v: 60, pos: 95, direction: Direction.LEFT },
                { element: Enemies.greenPlane, after: 20, times: 2, v: 50, pos: 20, offset: 90 },
                { element: Enemies.greenPlane, after: 20, times: 2, v: 50, pos: 60, offset: 90 },

                { element: Elements.cloud2, after: 30, times: 2, v: 10, pos: 40, offset: 70, delay: 20 },
                { element: Enemies.bigPlane, after: 5, times: 2, v: 25, pos: 20, direction: Direction.LEFT, offset: 30 },
                { element: Elements.cloud1, times: 2, v: 20, pos: 10, offset: 90, delay: 30 },
                { element: Enemies.bigPlane, after: 40, times: 2, v: 25, pos: 40, direction: Direction.RIGHT, offset: 30 },

                { element: Enemies.redPlane, after: 20, times: 4, v: 80, pos: 20, offset: 35 },

                { element: Elements.cloud1, after: 50, times: 2, v: 20, pos: 120, offset: 0, delay: 20 },
                { element: Enemies.grayPlane, after: 0, v: 100, pos: 80, direction: Direction.LEFT },
                { element: Enemies.grayPlane, after: 0, v: 100, pos: 85, direction: Direction.RIGHT },
                { element: Enemies.grayPlane, after: 7, v: 100, pos: 60, direction: Direction.LEFT },
                { element: Enemies.grayPlane, after: 0, v: 100, pos: 65, direction: Direction.RIGHT },
                { element: Enemies.grayPlane, after: 7, v: 100, pos: 40, direction: Direction.LEFT },
                { element: Enemies.grayPlane, after: 0, v: 100, pos: 45, direction: Direction.RIGHT },
                { element: Enemies.grayPlane, after: 7, v: 100, pos: 20, direction: Direction.LEFT },
                { element: Enemies.grayPlane, after: 0, v: 100, pos: 25, direction: Direction.RIGHT },

            ])
            .build()
            .nextLevel("Naval battle").with([
                { element: Elements.cloud1, after: 20, times: 2, v: 30, pos: 130, offset: -60, delay: 10 },
                { element: Enemies.greenPlane, after: 10, times: 3, v: 50, pos: 50, direction: Direction.LEFT },
                { element: Elements.cloud1, times: 2, v: 23, pos: 100, offset: -60, delay: 10 },
                { element: Elements.cloud1, after: 30, v: 23, pos: halfWidth, offset: -60, delay: 10 },
                { element: Enemies.redPlane, times: 4, v: 80, pos: 10, offset: 10, delay: 2, direction: Direction.RIGHT },

                { element: Elements.cloud2, after: 15, times: 3, v: 15, pos: 30, offset: 50, delay: 10 },
                { element: Enemies.bigPlane, after: 15, times: 3, v: 30, pos: 40, offset: 20, delay: 6 },
                { element: Elements.cloud2, after: 15, times: 3, v: 15, pos: 50, offset: 45, delay: 6 },
                { element: Enemies.greenPlane, after: 10, times: 4, v: 30, pos: 120, offset: 0, delay: 4 },

                { element: Elements.cloud1, after: 10, times: 2, v: 10, pos: 140, offset: -70, delay: 10 },
                { element: Elements.cloud1, after: 10, times: 2, v: 12, pos: 30, offset: 90, delay: 10 },
                { element: Enemies.frigate, v: 5, pos: 65 },
                { element: Enemies.frigate, after: 10, v: 5, pos: 120 },

                { element: Elements.cloud1, after: 20, times: 2, v: 30, pos: 130, offset: -60, delay: 10 },
                { element: Enemies.greenPlane, after: 10, times: 3, v: 40, pos: 30, direction: Direction.LEFT },
                { element: Elements.cloud1, times: 2, v: 27, pos: 100, offset: -40, delay: 15 },
                { element: Elements.cloud1, after: 20, v: 23, pos: halfWidth, offset: -60, delay: 10 },
                { element: Enemies.redPlane, times: 4, v: 80, pos: 10, offset: 10, delay: 2, direction: Direction.LEFT },

                { element: Elements.cloud2, after: 15, times: 3, v: 15, pos: 30, offset: 50, delay: 10 },
                { element: Enemies.bigPlane, after: 15, times: 3, v: 30, pos: 40, offset: 20, delay: 6 },
                { element: Elements.cloud2, after: 15, times: 3, v: 15, pos: 50, offset: 45, delay: 6 },
                { element: Enemies.greenPlane, after: 10, times: 4, v: 30, pos: 120, offset: 0, delay: 4 },

                { element: Elements.cloud1, after: 40, times: 2, v: 10, pos: 140, offset: -70, delay: 10 },
                { element: Elements.cloud1, after: 10, times: 2, v: 12, pos: 30, offset: 90, delay: 10 },
                { element: Enemies.frigate, v: 5, pos: 65 },
                { element: Enemies.frigate, after: 10, v: 5, pos: 120 },
                { element: Elements.cloud1, after: 70, times: 2, v: 20, pos: 120, offset: 0, delay: 20 },
                { element: Elements.cloud2, v: 5, pos: 20 },
                { element: Elements.cloud2, after: 30, v: 5, pos: 30 },
                { element: Enemies.battleShip, after: 30, v: 15, pos: 30 },
            ])
            .build()

            .nextLevel("Tank mayhem").with([
                { element: Elements.cloud1, after: 20, times: 2, v: 27, pos: 110, offset: -50, delay: 15 },
                { element: Enemies.greenPlane, after: 10, times: 2, v: 50, pos: 100, offset: 25, delay: 0 },
                { element: Enemies.greenPlane, after: 4, times: 2, v: 50, pos: 100, offset: 25, delay: 0 },
                { element: Elements.cloud1, times: 2, v: 23, pos: 130, offset: -50, delay: 10 },
                { element: Elements.cloud1, after: 30, v: 23, pos: halfWidth, offset: -60, delay: 10 },
                { element: Enemies.redPlane, times: 2, v: 80, pos: 10, offset: 25, delay: 0 },
                { element: Enemies.redPlane, after: 3, times: 2, v: 80, pos: 10, offset: 25, delay: 0 },

                { element: Elements.cloud1, after: 20, times: 2, v: 27, pos: 110, offset: -50, delay: 15 },
                { element: Enemies.greenPlane, after: 10, times: 2, v: 50, pos: 110, offset: 25, delay: 0 },
                { element: Enemies.greenPlane, after: 4, times: 2, v: 50, pos: 110, offset: 25, delay: 0 },
                { element: Enemies.greenPlane, after: 4, times: 2, v: 50, pos: 110, offset: 25, delay: 0 },
                { element: Elements.cloud1, times: 2, v: 23, pos: 130, offset: -50, delay: 10 },
                { element: Elements.cloud1, after: 30, v: 23, pos: halfWidth, offset: -60, delay: 10 },
                { element: Enemies.redPlane, after: 0, times: 2, v: 80, pos: 15, offset: 25, delay: 0 },
                { element: Enemies.redPlane, after: 3, times: 2, v: 80, pos: 15, offset: 25, delay: 0 },
                { element: Enemies.redPlane, after: 3, times: 2, v: 80, pos: 15, offset: 25, delay: 0 },

                { element: Elements.island1, after: 10, times: 2, v: 10, pos: 120, offset: -20 },
                { element: Enemies.tank, after: 19, times: 2, v: 10, pos: 95, offset: 30, delay: 15 },
                { element: Elements.island4, after: 10, v: 10, pos: 20 },
                { element: Enemies.tank, after: 17, times: 2, v: 10, pos: 10, offset: 10, delay: 15 },

                { element: Elements.cloud1, after: 15, times: 2, v: 25, pos: 95, offset: 45, delay: 10 },
                { element: Enemies.redPlane, after: 15, v: 60, pos: halfHeight, direction: Direction.LEFT },
                { element: Enemies.redPlane, v: 60, pos: halfHeight, direction: Direction.RIGHT },
                { element: Enemies.redPlane, v: 60, pos: halfWidth },
                { element: Enemies.redPlane, v: 60, pos: halfWidth, direction: Direction.UP },

                { element: Elements.island2, after: 10, v: 10, pos: halfWidth },
                { element: Elements.cloud1, times: 3, v: 27, pos: 30, offset: 45, delay: 20 },
                { element: Enemies.greenPlane, after: 25, times: 2, v: 40, pos: 70, direction: Direction.LEFT },
                { element: Enemies.greenPlane, after: 10, times: 2, v: 40, pos: 30, direction: Direction.RIGHT },
                { element: Elements.cloud1, after: 10, v: 30, pos: 30, offset: 80, delay: 40 },
                { element: Elements.island3, after: 10, v: 10, pos: 130 },
                { element: Enemies.greenPlane, after: 40, times: 2, v: 40, pos: 70, direction: Direction.LEFT },
                { element: Enemies.greenPlane, after: 10, times: 2, v: 40, pos: 30, direction: Direction.RIGHT },
                { element: Elements.cloud1, times: 4, v: 38, pos: 130, offset: -35, delay: 5 },
                { element: Elements.cloud2, after: 15, v: 27, pos: 50 },
                { element: Enemies.greenPlane, after: 15, times: 6, v: 15, delay: 0, pos: 10, offset: 27 },
                { element: Enemies.redPlane, after: 10, times: 5, v: 30, delay: 0, pos: 25, offset: 27 },
                { element: Enemies.grayPlane, after: 10, times: 6, v: 80, delay: 0, pos: 10, offset: 27 },

                { element: Elements.cloud2, times: 3, v: 15, pos: 30, offset: 50, delay: 10 },

                { element: Elements.island2, after: 10, v: 10, pos: 150, offset: 0, delay: 20 },
                { element: Enemies.tank, after: 10, times: 3, v: 10, pos: 150, offset: 0, delay: 15 },
                { element: Elements.island3, after: 10, v: 10, pos: 10, offset: 0, delay: 20 },
                { element: Enemies.tank, after: 12, times: 3, v: 10, pos: 7, offset: 0, delay: 15 },

                { element: Elements.cloud2, after: 100, v: 15, pos: 30, offset: 50, delay: 10 },
            ])
            .build()

            .nextLevel("Missile alert").with([

                { element: Enemies.greenPlane, after: 20, times: 2, v: 40, pos: 70, offset: 25, delay: 0 },
                { element: Enemies.greenPlane, after: 6, times: 2, v: 40, pos: 70, offset: 25, delay: 0 },

                { element: Enemies.redPlane, after: 20, times: 2, v: 60, pos: 20, offset: 25, delay: 0 },
                { element: Enemies.redPlane, after: 4, times: 2, v: 60, pos: 20, offset: 25, delay: 0 },

                { element: Enemies.grayPlane, after: 20, times: 2, v: 80, pos: 120, offset: 25, delay: 0 },
                { element: Enemies.grayPlane, after: 3, times: 2, v: 80, pos: 120, offset: 25, delay: 0 },

                { element: Elements.island2, after: 0, v: 10, pos: 7 },
                { element: Elements.island4, after: 5, v: 10, pos: 140 },
                { element: Enemies.antiAircraftTower, after: 19, v: 10, pos: 15 },
                { element: Enemies.antiAircraftTower, after: 9, v: 10, pos: 150 },

                { element: Elements.cloud1, after: 15, times: 2, v: 20, pos: 30, offset: 60, delay: 10 },
                { element: Elements.cloud1, after: 40, times: 2, v: 23, pos: 100, offset: -30, delay: 20 },

                { element: Elements.cloud2, after: 50, times: 2, v: 8, pos: halfWidth - 15, offset: 25, delay: 5 },
                { element: Enemies.bigPlane, v: 15, pos: 30 },
                { element: Enemies.frigate, after: 15, times: 2, v: 15, pos: 15, offset: 30, delay: 0 },
                { element: Enemies.battleShip, after: 15, v: 15, pos: 30 },

                { element: Enemies.bigPlane, after: 15, v: 15, pos: 115 },
                { element: Enemies.frigate, after: 15, times: 2, v: 15, pos: 100, offset: 30, delay: 0 },
                { element: Enemies.battleShip, after: 15, v: 15, pos: 115 },
                { element: Elements.island2, after: 10, v: 10, pos: 30 },
                { element: Enemies.antiAircraftTower, after: 27, v: 10, pos: 35 },

                { element: Elements.island4, after: 10, v: 10, pos: 137 },
                { element: Enemies.antiAircraftTower, after: 27, v: 10, pos: 142 },

                { element: Enemies.bigPlane, after: 45, times: 3, v: 30, pos: 20, offset: 20, delay: 6 },
                { element: Elements.cloud2, after: 30, times: 2, v: 8, pos: halfWidth - 15, offset: 25, delay: 5 },

                { element: Elements.cloud2, after: 30, times: 2, v: 12, pos: 30, offset: 25, delay: 15 },
                { element: Enemies.greenPlane, after: 10, v: 35, pos: 25 },
                { element: Enemies.greenPlane, after: 0, v: 50, pos: 25, direction: Direction.RIGHT },

                { element: Enemies.greenPlane, after: 0, v: 35, pos: scene.screenWidth() - 25, direction: Direction.UP },
                { element: Enemies.greenPlane, after: 0, v: 50, pos: scene.screenHeight() - 25, direction: Direction.LEFT },

                { element: Elements.island4, after: 10, v: 10, pos: 80 },
                { element: Enemies.antiAircraftTower, after: 20, times: 3, v: 10, pos: 63, offset: 17, delay: 0 },
                { element: Elements.cloud1, after: 30, v: 23, pos: halfWidth, offset: -60, delay: 10 },
                { element: Elements.cloud1, after: 20, v: 23, pos: halfWidth, offset: -60, delay: 10 },

                { element: Enemies.redPlane, after: 0, v: 35, pos: 25 },
                { element: Enemies.redPlane, after: 0, v: 50, pos: 25, direction: Direction.RIGHT },

                { element: Enemies.redPlane, after: 0, v: 35, pos: scene.screenWidth() - 25, direction: Direction.UP },
                { element: Enemies.redPlane, after: 0, v: 50, pos: scene.screenHeight() - 25, direction: Direction.LEFT },
            ])
            .build()

            .nextLevel("Bomber invasion").with([

                { element: Elements.cloud1, after: 15, times: 2, v: 20, pos: 95, offset: 45, delay: 10 },
                { element: Elements.cloud1, after: 20, times: 2, v: 17, pos: 40, offset: 70, delay: 5 },
                { element: Enemies.greenPlane, after: 30, v: 20, pos: halfHeight - 10, direction: Direction.LEFT },
                { element: Enemies.greenPlane, v: 20, pos: halfHeight + 10, direction: Direction.RIGHT },

                { element: Enemies.greenPlane, v: 20, pos: halfWidth - 10 },
                { element: Enemies.greenPlane, v: 20, pos: halfWidth - 10, direction: Direction.UP },

                { element: Enemies.grayPlane, v: 60, pos: halfHeight - 5, direction: Direction.LEFT },
                { element: Enemies.grayPlane, v: 60, pos: halfHeight + 5, direction: Direction.RIGHT },
                { element: Enemies.grayPlane, v: 60, pos: halfWidth - 5 },
                { element: Enemies.grayPlane, v: 60, pos: halfWidth + 5, direction: Direction.UP },

                { element: Elements.cloud1, after: 70, times: 3, v: 20, pos: 30, offset: 45, delay: 20 },
                { element: Enemies.bomberPlane, after: 30, v: 20, pos: halfWidth, direction: Direction.UP },

                { element: Elements.cloud2, after: 30, times: 3, v: 15, pos: 30, offset: 50, delay: 10 },

                { element: Elements.island2, after: 10, v: 10, pos: 150, offset: 0, delay: 20 },
                { element: Enemies.tank, after: 10, times: 3, v: 10, pos: 150, offset: 0, delay: 15 },
                { element: Elements.island3, after: 10, v: 10, pos: 10, offset: 0, delay: 20 },
                { element: Enemies.tank, after: 12, times: 3, v: 10, pos: 7, offset: 0, delay: 15 },

                { element: Enemies.frigate, after: 30, v: 5, pos: 50, direction: Direction.UP },
                { element: Elements.cloud2, times: 2, v: 15, pos: 120, offset: -30, delay: 10 },
                { element: Enemies.frigate, after: 10, v: 5, pos: 100, direction: Direction.UP },
                { element: Elements.cloud1, after: 10, v: 15, pos: 30 },

                { element: Elements.cloud1, after: 40, times: 4, v: 15, pos: 5, offset: 4, delay: 20 },
                { element: Elements.cloud1, after: 15, times: 4, v: 15, pos: 140, offset: -7, delay: 20 },
                { element: Enemies.greenPlane, after: 25, times: 2, v: 50, pos: 40, direction: Direction.LEFT },
                { element: Elements.cloud2, times: 3, v: 15, pos: 50, offset: 30, delay: 10 },
                { element: Enemies.redPlane, after: 20, times: 2, v: 50, pos: 70, direction: Direction.RIGHT },
                { element: Elements.cloud2, times: 3, v: 15, pos: 100, offset: -30, delay: 14 },

                { element: Enemies.grayPlane, after: 30, times: 3, v: 30, pos: 40, offset: 30, delay: 4, direction: Direction.LEFT },
                { element: Enemies.grayPlane, times: 3, v: 30, pos: 25, offset: 30, delay: 4, direction: Direction.RIGHT },

                { element: Enemies.bigPlane, after: 50, times: 3, v: 10, pos: 60, offset: 20, direction: Direction.UP },
                { element: Elements.cloud1, times: 3, v: 8, pos: 150, offset: -3, delay: 37 },
                { element: Elements.cloud1, after: 10, times: 3, v: 10, pos: 5, offset: 4, delay: 27 },
                { element: Enemies.bigPlane, after: 20, times: 3, v: 10, pos: 60, offset: 20, direction: Direction.UP },

                { element: Enemies.frigate, after: 91, times: 3, v: 10, delay: 0, pos: 20, offset: 30, direction: Direction.LEFT },
                { element: Enemies.frigate, times: 3, v: 10, delay: 0, pos: 35, offset: 30, direction: Direction.RIGHT },

                { element: Elements.cloud2, after: 90, times: 3, v: 7, pos: 50, offset: 40, delay: 15 },
                { element: Enemies.bomberPlane, after: 30, times: 2, v: 12, delay: 25, pos: 50, offset: 70 },

                { element: Elements.cloud1, after: 50, v: 15, pos: 30 },
                { element: Elements.cloud1, after: 50, v: 15, pos: 130 },
                { element: Elements.cloud1, after: 50, v: 15, pos: 80 },

                { element: Elements.cloud2, times: 3, v: 7, pos: 115, offset: -40, delay: 15 },
                { element: Enemies.bomberPlane, after: 50, times: 3, v: 10, delay: 0, pos: 25, offset: 54 },
                { element: Elements.cloud1, times: 2, v: 20, pos: 95, offset: 45, delay: 10 },
                { element: Enemies.grayPlane, after: 50, times: 2, v: 70, delay: 0, pos: 50, offset: 60 },
                { element: Enemies.grayPlane, after: 7, v: 70, delay: 0, pos: halfWidth, offset: 0 },
                { element: Enemies.grayPlane, after: 7, times: 2, v: 70, delay: 0, pos: 50, offset: 60 },
            ])
            .build()

            .nextLevel("Chopper armageddon").with([

                { element: Elements.cloud2, after: 0, times: 3, v: 15, pos: 30, offset: 50, delay: 10 },
                { element: Enemies.frigate, after: 10, times: 3, v: 10, pos: 30, offset: 0, delay: 25, direction: Direction.DOWN },
                { element: Enemies.frigate, after: 30, times: 3, v: 10, pos: 100, offset: 0, delay: 25, direction: Direction.DOWN },
                { element: Elements.cloud1, after: 10, times: 4, v: 20, pos: 130, offset: -35, delay: 5 },
                { element: Enemies.grayPlane, after: 20, times: 2, v: 40, delay: 0, pos: 50, offset: 70 },

                { element: Elements.cloud1, after: 30, times: 3, v: 15, pos: 50, offset: 40, delay: 15 },

                { element: Elements.island3, after: 0, v: 10, pos: 20 },
                { element: Enemies.tank, after: 12, v: 10, pos: 15, offset: 0, delay: 15 },
                { element: Enemies.antiAircraftTower, after: 20, v: 10, pos: 15 },

                { element: Elements.island2, after: 0, v: 10, pos: 145 },
                { element: Enemies.tank, after: 16, v: 10, pos: 150, offset: 0, delay: 15 },
                { element: Enemies.antiAircraftTower, after: 20, v: 10, pos: 150 },

                { element: Enemies.combatHelicopter, after: 30, v: 15, pos: 60 },
                { element: Enemies.combatHelicopter, after: 0, v: 15, pos: 80 },

                { element: Elements.cloud2, after: 10, times: 2, v: 20, pos: 30, offset: 70, delay: 20 },
                { element: Enemies.greenPlane, after: 20, times: 4, v: 40, pos: 15, offset: 0, delay: 7, direction: Direction.RIGHT },
                { element: Enemies.redPlane, after: 20, times: 4, v: 60, pos: 55, offset: 0, delay: 5, direction: Direction.RIGHT },
                { element: Enemies.greenPlane, after: 20, times: 4, v: 40, pos: 40, offset: 0, delay: 7, direction: Direction.LEFT },
                { element: Enemies.redPlane, after: 20, times: 4, v: 60, pos: 80, offset: 0, delay: 5, direction: Direction.LEFT },


                { element: Enemies.combatHelicopter, times: 3, after: 40, v: 15, pos: 30, offset: 50, delay: 0 },

                { element: Elements.cloud2, after: 40, times: 2, v: 20, pos: 20, offset: 90, delay: 10 },
                { element: Enemies.greenPlane, after: 20, times: 3, v: 40, pos: 15, offset: 0, delay: 7, direction: Direction.RIGHT },
                { element: Enemies.greenPlane, after: 0, times: 3, v: 40, pos: 40, offset: 0, delay: 7, direction: Direction.LEFT },
                { element: Enemies.redPlane, after: 20, times: 3, v: 60, pos: 55, offset: 0, delay: 5, direction: Direction.RIGHT },
                { element: Enemies.redPlane, after: 0, times: 3, v: 60, pos: 80, offset: 0, delay: 5, direction: Direction.LEFT },

                { element: Elements.cloud1, after: 0, times: 2, v: 20, pos: 30, offset: 70, delay: 20 },
                { element: Enemies.combatHelicopter, times: 3, after: 70, v: 15, pos: 30, offset: 50, delay: 0, direction: Direction.UP },
                { element: Elements.cloud2, after: 0, times: 2, v: 20, pos: 50, offset: 50, delay: 40 },
                { element: Enemies.combatHelicopter, times: 2, after: 80, v: 15, pos: 30, offset: 30, delay: 10, direction: Direction.LEFT },
                { element: Enemies.combatHelicopter, times: 2, after: 0, v: 15, pos: 30, offset: 30, delay: 10, direction: Direction.RIGHT },
            ])
            .build()

            .nextLevel("Final battle").with([

                { element: Elements.cloud2, after: 0, times: 2, v: 27, pos: 110, offset: -50, delay: 15 },

                { element: Elements.cloud2, after: 50, times: 2, v: 8, pos: halfWidth - 15, offset: 25, delay: 5 },
                { element: Enemies.bigPlane, v: 15, pos: 30 },
                { element: Enemies.frigate, after: 15, times: 2, v: 15, pos: 15, offset: 30, delay: 0 },
                { element: Enemies.battleShip, after: 15, v: 15, pos: 30 },
                { element: Enemies.combatHelicopter, after: 60, v: 15, pos: 30 },

                { element: Elements.cloud2, after: 50, times: 2, v: 8, pos: halfWidth + 15, offset: 45, delay: 15 },
                { element: Enemies.bigPlane, v: 15, pos: scene.screenWidth() - 30 },
                { element: Enemies.frigate, after: 15, times: 2, v: 15, pos: scene.screenWidth() - 15, offset: -30, delay: 0 },
                { element: Enemies.battleShip, after: 15, v: 15, pos: scene.screenWidth() - 30 },
                { element: Enemies.combatHelicopter, after: 60, v: 15, pos: scene.screenWidth() - 30 },

                { element: Elements.cloud1, after: 40, times: 2, v: 10, pos: 140, offset: -70, delay: 10 },
                { element: Elements.cloud1, after: 10, times: 2, v: 12, pos: 30, offset: 90, delay: 10 },

                { element: Elements.island3, after: 20, v: 10, pos: 20 },
                { element: Elements.island2, after: 0, v: 10, pos: 145 },

                { element: Enemies.tank, after: 12, v: 10, pos: 15, offset: 0, delay: 15 },
                { element: Enemies.tank, after: 0, v: 10, pos: 150, offset: 0, delay: 15 },
                { element: Enemies.frigate, after: 0, times: 2, v: 10, pos: halfWidth - 30, offset: 60, delay: 0 },

                { element: Enemies.antiAircraftTower, after: 20, v: 10, pos: 15 },
                { element: Enemies.antiAircraftTower, after: 0, v: 10, pos: 150 },

                { element: Enemies.combatHelicopter, after: 0, v: 15, pos: halfWidth },

                { element: Elements.cloud1, after: 70, times: 3, v: 20, pos: 30, offset: 45, delay: 20 },
                { element: Enemies.bomberPlane, after: 30, v: 20, pos: halfWidth, direction: Direction.UP },
                { element: Enemies.bomberPlane, after: 50, times: 2, v: 20, pos: halfWidth - 30, offset: 60 },

                { element: Enemies.grayPlane, after: 70, times: 6, v: 80, delay: 0, pos: 10, offset: 27 },

                { element: Elements.cloud2, after: 50, times: 3, v: 15, pos: 30, offset: 45, delay: 0 },
                { element: Enemies.bomberPlane, after: 7, times: 3, v: 20, pos: halfWidth - 70, offset: 70 },
            ])
            .build()
            .levels;
    }

    function levelInfo(level: Level): void {
        game.splash("Level " + level.level, level.description);
    }

    function onLevelComplete(ticks: number) {
        if (ticks == 80) Players.levelCompleted()
    }

    function onLevelBegin() {
        Players.spawn()
    }

    export function play() {
        playTitleScene()
        Players.create()

        const designedLevels = setup();
        let currentLevel = designedLevels.shift();
        // for testing 
        // while(designedLevels.length>0)
        //     designedLevels.shift()
        levelInfo(currentLevel);
        onLevelBegin()
        let lastElementAtTick = 0;
        let ticks = 0;
        game.onUpdateInterval(hardcore ? 60 : 100, () => {
            ticks++;

            updateProgressBar(currentLevel, ticks)
            while (currentLevel.storyBook.length > 0 && currentLevel.storyBook[0].t <= ticks) {
                const event = currentLevel.storyBook.shift();
                event.createElement();
                lastElementAtTick = ticks;
            }

            if (currentLevel.storyBook.length == 0) {
                onLevelComplete(ticks - lastElementAtTick)
                // End of level
                if (ticks > lastElementAtTick + 100) {
                    // 10s after the last element has been created

                    summary.show()
                    summary.clear()

                    //temp, forever random levels
                    currentLevel = designedLevels.shift();
                    if (!currentLevel)
                        currentLevel = randomLevels().shift()
                    // if (currentLevel) {//with forever generated levels not required anymore
                    // next level
                    ticks = 0;
                    lastElementAtTick = 0
                    levelInfo(currentLevel);
                    onLevelBegin()
                    // } else {
                    //     // light.showAnimation(light.runningLightsAnimation, 3000);
                    //     game.over(true);
                    // }
                }
            }
        })
    }

    function randomLevels() {
        const elements = []
        for (let i = 0; i < 20; i++) {
            // { element: Enemies.bigPlane, after: 5, times: 2, v: 25, pos: 20, direction: Direction.LEFT, offset: 30 },
            const elementGroup = Math.randomRange(0, 1)
            elements.push({
                element: Math.pickRandom(elementTypes[elementGroup]), //Math.randomRange(0, 16) //Enemies.greenPlane,
                after: Math.randomRange(40, 60),
                times: elementGroup == 1 ? 1 : Math.randomRange(1, 4),
                v: elementGroup == 1 ? 10 : Math.randomRange(20, 50),
                pos: Math.randomRange(10, 100),
                direction: elementGroup == 1 ? Direction.DOWN : Math.pickRandom([Direction.UP, Direction.LEFT, Direction.DOWN, Direction.RIGHT]),
                offset: Math.randomRange(20, 40)
            }
            )
        }
        return gameBuilder.nextLevel("Random Generated Level").with(elements).build().levels
    }

    //aqee, add title scene
    function playTitleScene() {
        let spriteTitle = sprites.create(img`
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffff.....fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffff.....fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffff......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffffff......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffff.......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffff........fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffff.......ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffff...........fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffff............ffffffffffffffffffffff.....ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffffff.............fffffffffffffffffffff.....ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffff..............fffffffffffffffffffff......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffff........f.......ffffffffffffffffffff.......ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fffff.......ff........fffffffffffffffffff........fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffff........fff.......fffffffffffffffffff........fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fff........ffff........fffffffffffffffffff........ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    fff.......ffffff........fffffffffffffffffff.......ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ff........fffffff.......ffffffffffffffffffff......fffffffffffffffffffffffffffffffffffffffffff.....ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f........ffffffff........fffffffffffffffffff......fffffffffffffffffffffffff.....fffffffffffff.....ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f.......ffffffffff........fffffffffffffffffff.....ffffffffffffffffffffffff......fffffffffffff.....ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f.......fffffffffff.......fffffffffffffffffffffffffffffffffffffffffffffff.......fffffffffffff......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f......ffffffffffff.......ffffffffffffffffffffffffffffffffffffffffffffff........fffffffffffff......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    f.....ffffffffffffff......fffffffffffffffffffffffffffffffffffffffffffff.........fffffffffffff......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ......fffffffffffffff......ffffffffffffffffffffffffffffffff.....ffffff.........ffffffffffffff......fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ......fffffffffffffff......fffffffffffff.....ffffffffffffff........ff.........ffffffffffffffff.....fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ......ffffffffffff.........fffffffffffff......fffffffffffff........f.........fffffffffffffffff.....ffffffffffffffffffffffffffffff.....ffffffffffffffffffffffffff
    ......fffff.................ffffffffffff......fffffffffffff.................ffffffffffffffffff......fffffffffffffffffffffffffffff.....ffffffffffffffffffffffffff
    .....ffffff.................ffffffffffff......fffffffffffff................fffffffffffffffffff......fffffffffffffffffffffffffffff......fffffffffffffffffffffffff
    .....ffffff.................ffffffffffff.......fffffffffffff..............ffffffffffffffffffff......fffffffffffffffffffffffffffff.......ffffffffffffffffffffffff
    .....ffffff.................fffffffffffff......fffffffffffffff...........fffffffffffffffffffff......fffffffffffffffffffffffffffff.......ffffffffffffffffffffffff
    .....ffffff.................fffffffffffff......fffffffffffffff..........fffffffffffffffffffffff......ffffffffffffffffffffffffffff........fffffffffffffffffffffff
    .....ffffffffffffffffff......ffffffffffff......ffffffffffffffff........ffffffffffffffffffffffff......fffffffffffffffffffffffffffff.......fffffffffffffffffffffff
    .....ffffffffffffffffff......fffffffffffff.....fffffffffffffff........fffffffffffffffffffffffff......ffffffffffffffffffffffffffffff.......fffff.....ffffffffffff
    .....ffffffffffffffffff......ffffffffffff......fffffffffffffff........fffffffffffffffffffffffff.......fffffffffffffffffffffffffffff.......fffff.....ffffffffffff
    ....fffffffffffffffffff......fffffffffff.......ffffffffffffff........fffffffffffffffffffffffffff......ffffffffffffffffffffffffffffff......ffff......ffffffffffff
    ....ffffffffffffffffffff.....fffffffffff.......ffffffffffffff.......ffffffffffffffffffffffffffff......ffffffffffffffffffffffffffffff.......ff.......ffffffffffff
    ....ffffffffffffffffffff.....fffffffffff.......ffffffffffffff.......ffffffffffffffffffffffffffff......fffffffffffffffffffffffffffffff......f........ffffffffffff
    ffffffffffffffffffffffffffffffffffffffff......fffffffffffffff.......fffffffffffffffffffffffffffff.....fffffffffffffffffffffffffffffff...............ffffffffffff
    ffffffffffffffffffffffffffffffffffffffff.....ffffffffffffffff.......fffffffffffffffffffffffffffff.....fffffffffffffffffffffffffffffff..............fffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffffffffffffff......fffffffffffffffffffffffffffffff............ffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffffffffffffff......fffffffffffffffffffffffffffffff...........fffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......ffffffffffffffffffffffffffff............ffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......fffffffffffffffffffffffffff............fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......fffffffffffffffffffffffff.............fffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......ffffffffffffffffffffffff...............ffffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffffff..................fffffffffffffff
    fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......fffffffffffffffffffff..........ff.......fffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffff.........fff........ffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffff........fffff.......ffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffff.......fffffff........ffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff......ffffffffffffffffffff.....fffffffff.........fffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.....ffffffffffffffffffffffff......ffffffffffffffffffff......ffffffff........fffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff.......ffffffffffffffffffffffff......fffffffffffffffffff........fffffff........fffffffffff
    fffffffffffffffffffffffff.......fffffffffffffffffffffffffffffffffffff.........fffff......ffffffffffff.............fffffffffff..........fffffff.......fffffffffff
    fffffffffffff...................ffffffffffff........fffffffffffffffff.........ffff........fffffffffff..............fffffffff...........ffffffff......fffffffffff
    fffffffffffff...................ffffffffff...........fffffffffffffff...........ff..........fffffffffff..............fffffff............fffffffffffffffffffffffff
    fffffffff.......................fffffffff.............ffffffffffffff...........ff..........fffffffffff................ffff..............ffffffffffffffffffffffff
    fffffff.........................fffffffff..............fffffffffffff........................ffffffffff................ffff..............ffffffffffffffffffffffff
    fffff........................ffffffffffff...............ffffffffffff.........................fffffffff.....fff.........fff...............fffffffffffffffffffffff
    ffff..........fffffffffffffffffffffffffff................fffffff.........f...................fffffffff.....ffff........fff......ff.......fffffffffffffffffffffff
    fff...........ffffffffffffffffffffffff........fff.........ffffff.........f....................ffffffff......ffff.......fff.....ff.........ffffffffffffffffffffff
    fff..........fffffffffffffffffffffffff.....fffffff........ffffff.........ff..........ff........fffffff......fffff......fff.....ff..........fffffffffffffffffffff
    ff.........fffffffffffffffffffffffffff.....ffffffff........fffff.........ff..........fff.......fffffff......ffffff.....ff......ff............fffffffffffffffffff
    f........fffffffffffffffffffffffffffff.....fffffffff.......fffff.........ff.........ffff........ffffff......ffffff.....ff......ff.............ffffffffffffffffff
    f.......ffffffffffffffffffffffffffffff.....ffffffffff......fffff.........ff........ffffff........ffffff.....ffffff.....ff......................fffffffffffffffff
    f.......ffffffffffffffffffffffffffffff.....ffffffffff......fffff........fff........fffffff.......ffffff.....ffffff.....ff......................fffffffffffffffff
    f......ffffffffffffffffffffffffffffff......fffffffffff.....fffff........fff.......ffffffff.......ffffff.....fffff......ff.............f........fffffffffffffffff
    f......ffffffffffffffffffffffffffffff......ffffffffff......fffff........fff.......fffffffff......ffffff.....fffff......ff.............fff......fffffffffffffffff
    f......ffffffffffffffffffffffffffffff......ffffffffff......fffff.......ffff.......ffffffffff.....ffffff.......fff......ff............fffff.....fffffffffffffffff
    f.......fffffffffffffffffffffffffffff......ffffffffff......ffffff......fff.......fffffffffff......fffffff.....ff.......ff..........fffffffffffffffffffffffffffff
    f.......fffffffffffffffffffffffffffff.....ffffffffff.......ffffff......fff.......fffffffffff.......fffff......f.......ffff........ffffffffffffffffffffffffffffff
    ff.......ffffffffffffffffffffffffffff......ffffffff.......fffffff.....ffff.......fffffffffff.......fffff..............fffff.....ffffffffffffffffffffffffffffffff
    ff.........ffffffffffffffffffffffffff.......ffffff........fffffff.....ffff......ffffffffffff.......fffff..............ffffffffffffffffffffffffffffffffffffffffff
    fff..........fffffffffffffffff.....ff.........ff..........fffffff.....ffff......fffffffffffff......fffff.............fffffffffffffffffffffffffffffffffffffffffff
    fff...............fff..............ff....................ffffffff.....ffff.....fffffffffffffff.....fffff............ffffffffffffffffffffffffffffffffffffffffffff
    ffff...............................fff..................fffffffff.....ffff.....fffffffffffffffffffffffff...........fffffffffffffffffffffffffffffffffffffffffffff
    fffff..............................ffff................ffffffffff.....ffffffffffffffffffffffffffffffffff.........fffffffffffffffffffffffffffffffffffffffffffffff
    fffffff............................fffff..............ffffffffffffffffffffffffffffffffffffffffffffffffff........ffffffffffffffffffffffffffffffffffffffffffffffff
    fffffffff..........................fffffff..........ffffffffffffffffffffffffffffffffffffffffffffffffffff.......fffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffff...........fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
    ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
`, SpriteKind.UI)
        spriteTitle.z = 100
        pause(1000)
        for (let i = 1; i < 6; i++) {
            spriteTitle.setScale(i * i)
            pause(50)
        }
        spriteTitle.destroy()
    }

    //aqee, add progress bar
    let spriteProgressBar: Sprite = sprites.create(image.create(160, 1), SpriteKind.UI)
    spriteProgressBar.setPosition(80, 120)
    spriteProgressBar.z = 99
    spriteProgressBar.setFlag(SpriteFlag.RelativeToCamera, true)
    let totalTicks: number
    function updateProgressBar(level: Level, ticks: number) {
        if (ticks == 1) {
            spriteProgressBar.image.fill(15)
            totalTicks = level.storyBook[level.storyBook.length - 1].t + 100 //wait 10s, as storyboard does
            level.storyBook.forEach((e) => {
                spriteProgressBar.image.setPixel(e.t * 160 / totalTicks, 0, e.color) //can't distinguish enemy/cloud here :(
            })
        }
        spriteProgressBar.image.fillRect(0, 0, ticks * 160 / totalTicks, 1, 4)
    }

} // namespace