import IsNaN from "./IsNaN";

export default class Spring {
    static readonly Iterations = 8;

    public Target = new Vector3();
    public Position = new Vector3();
    public Velocity = new Vector3();

    constructor(
        public Mass=5, 
        public Force=50, 
        public Damping=4, 
        public Speed=4
    ) {}

    public Shove(force: Vector3): void {
        let x = force.X;
        let y = force.Y;
        let z = force.Z;

        if (IsNaN(x) || x === math.huge || x === -math.huge)
            x = 0;
        if (IsNaN(y) || y === math.huge || y === -math.huge)
            y = 0;
        if (IsNaN(z) || z === math.huge || z === -math.huge)
            z = 0;

        this.Velocity = this.Velocity.add(new Vector3(x, y, z));
    }

    public Update(dt: number): Vector3 {
        const scaledDt: number = math.min(dt, 1) * this.Speed / Spring.Iterations;

        for (let i = 0; i < Spring.Iterations; i++) {
            const force: Vector3 = this.Target.sub(this.Position);
            let accel: Vector3 = force
                .mul(this.Force)
                .div(this.Mass);
            
            accel = accel.sub(this.Velocity.mul(this.Damping));
            this.Velocity = this.Velocity.add(accel.mul(scaledDt));
            this.Position = this.Position.add(this.Velocity.mul(scaledDt));
        }

        return this.Position
    }
}